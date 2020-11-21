import axios from 'axios';

class Request {
    constructor(url, options = {}) {
        this.timeouts = {};
        this.cancelMethods = {};
        this.pending = {};
        this.updating = {};
        this.pollingInProgress = {};
        this.options = {
            lockable: false,
            cancelable: true,
        };
        this.setOptions(options);
        this.setUrl(url);
    }
    setOptions = (options) => {
        this.option = Object.assign(this.options, options);
    }
    setUrl = (url) => {
        this.url = url;
    }
    setTimeout = (timeout, method) => {
        this.timeouts[method] = timeout;
    }
    cancel = (method) => {
        if (method) {
            const cancel = this.cancelMethods[method];
            const timeout = this.timeouts[method];

            if (typeof cancel === 'function') {
                cancel();
            }
            if (timeout) {
                clearTimeout(timeout);
            }
        } else {
            Object.keys(this.cancelMethods).forEach(reqMethod => (this.cancelMethods[reqMethod]()));
            Object.keys(this.timeouts)
                .forEach(reqMethod => (clearTimeout(this.timeouts[reqMethod])));
        }
        return this;
    }
    isPending = (method) => {
        if (method) {
            return !!this.pending[method];
        }
        return Object.keys(this.pending).some(pendingMethod => this.pending[pendingMethod]);
    }
    isPolling = (method) => {
        if (method) {
            return !!this.pollingInProgress[method];
        }
        return Object.keys(this.pollingInProgress)
            .some(pollingMethod => this.pollingInProgress[pollingMethod]);
    }
    isUpdating = (method) => {
        if (method) {
            return !!this.updating[method];
        }
        return Object.keys(this.updating).some(updatingMethod => this.updating[updatingMethod]);
    }
    setOffPendingStatus = (method) => {
        this.pending[method] = false;
        this.updating[method] = false;
    }
    setOffPendingStatusThen = (response, method) => {
        this.setOffPendingStatus(method);
        return response;
    }
    setOffPendingStatusCatch = (error, method) => {
        this.setOffPendingStatus(method);
        this.pollingInProgress[method] = false;
        if (this.options.errorHandler) {
            this.options.errorHandler(error, method);
        } else {
            throw error;
        }
    }
    poll = time => ({
        get: (cl, options) => this.pollingRequest(cl, options, time, 'get'),
        post: (cl, options) => this.pollingRequest(cl, options, time, 'post'),
    })
    get = options => this.sendRequest('get', options)
    post = options => this.sendRequest('post', options)
    pollingRequest = (cl, options, time, method, updating) =>
        this.sendRequest(method, options, updating).then((response) => {
            this.pollingInProgress[method] = true;
            let continuePolling;
            if (cl) {
                continuePolling = cl(response);
            }
            if (time && continuePolling !== false) {
                const timeOut = setTimeout(() => {
                    this.pollingRequest(cl, options, time, method, true);
                }, time);
                this.setTimeout(timeOut, method);
            } else {
                this.pollingInProgress[method] = false;
            }
            return response;
        });
    sendRequest = (method, options = {}, updating) => {
        const {
            lockable,
            cancelable,
            axiosInstance = null,
            ...axiosOption
        } = Object.assign({}, this.options, options);

        const instance = axiosInstance
          && axiosInstance.constructor === axios.constructor ? axiosInstance : axios;

        if (lockable && !updating && this.isPending(method)) {
            return Promise.reject(new Error('Request in progress'));
        }
        if (cancelable) {
            this.cancel(method);
        }
        this.updating[method] = !!updating;
        this.pending[method] = true;

        return instance({
            ...axiosOption,
            method,
            url: this.url,
            cancelToken: new axios.CancelToken((c) => {
                this.cancelMethods[method] = c;
            }),
        })
            .then(res => this.setOffPendingStatusThen(res, method))
            .catch(err => this.setOffPendingStatusCatch(err, method));
    }
}

export default Request;
