(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["axios-request"] = factory();
	else
		root["axios-request"] = factory();
})(self, function() {
return /******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "../node_modules/axios/index.js":
/*!**************************************!*\
  !*** ../node_modules/axios/index.js ***!
  \**************************************/
/*! dynamic exports */
/*! export __esModule [maybe provided (runtime-defined)] [no usage info] [provision prevents renaming (no use info)] -> ../node_modules/axios/lib/axios.js .__esModule */
/*! other exports [maybe provided (runtime-defined)] [no usage info] -> ../node_modules/axios/lib/axios.js */
/*! runtime requirements: module, __webpack_require__ */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__(/*! ./lib/axios */ "../node_modules/axios/lib/axios.js");

/***/ }),

/***/ "../node_modules/axios/lib/adapters/xhr.js":
/*!*************************************************!*\
  !*** ../node_modules/axios/lib/adapters/xhr.js ***!
  \*************************************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: module, __webpack_require__ */
/*! CommonJS bailout: module.exports is used directly at 19:0-14 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "../node_modules/axios/lib/utils.js");

var settle = __webpack_require__(/*! ./../core/settle */ "../node_modules/axios/lib/core/settle.js");

var cookies = __webpack_require__(/*! ./../helpers/cookies */ "../node_modules/axios/lib/helpers/cookies.js");

var buildURL = __webpack_require__(/*! ./../helpers/buildURL */ "../node_modules/axios/lib/helpers/buildURL.js");

var buildFullPath = __webpack_require__(/*! ../core/buildFullPath */ "../node_modules/axios/lib/core/buildFullPath.js");

var parseHeaders = __webpack_require__(/*! ./../helpers/parseHeaders */ "../node_modules/axios/lib/helpers/parseHeaders.js");

var isURLSameOrigin = __webpack_require__(/*! ./../helpers/isURLSameOrigin */ "../node_modules/axios/lib/helpers/isURLSameOrigin.js");

var createError = __webpack_require__(/*! ../core/createError */ "../node_modules/axios/lib/core/createError.js");

module.exports = function xhrAdapter(config) {
  return new Promise(function dispatchXhrRequest(resolve, reject) {
    var requestData = config.data;
    var requestHeaders = config.headers;

    if (utils.isFormData(requestData)) {
      delete requestHeaders['Content-Type']; // Let the browser set it
    }

    var request = new XMLHttpRequest(); // HTTP basic authentication

    if (config.auth) {
      var username = config.auth.username || '';
      var password = config.auth.password ? unescape(encodeURIComponent(config.auth.password)) : '';
      requestHeaders.Authorization = 'Basic ' + btoa(username + ':' + password);
    }

    var fullPath = buildFullPath(config.baseURL, config.url);
    request.open(config.method.toUpperCase(), buildURL(fullPath, config.params, config.paramsSerializer), true); // Set the request timeout in MS

    request.timeout = config.timeout; // Listen for ready state

    request.onreadystatechange = function handleLoad() {
      if (!request || request.readyState !== 4) {
        return;
      } // The request errored out and we didn't get a response, this will be
      // handled by onerror instead
      // With one exception: request that using file: protocol, most browsers
      // will return status as 0 even though it's a successful request


      if (request.status === 0 && !(request.responseURL && request.responseURL.indexOf('file:') === 0)) {
        return;
      } // Prepare the response


      var responseHeaders = 'getAllResponseHeaders' in request ? parseHeaders(request.getAllResponseHeaders()) : null;
      var responseData = !config.responseType || config.responseType === 'text' ? request.responseText : request.response;
      var response = {
        data: responseData,
        status: request.status,
        statusText: request.statusText,
        headers: responseHeaders,
        config: config,
        request: request
      };
      settle(resolve, reject, response); // Clean up request

      request = null;
    }; // Handle browser request cancellation (as opposed to a manual cancellation)


    request.onabort = function handleAbort() {
      if (!request) {
        return;
      }

      reject(createError('Request aborted', config, 'ECONNABORTED', request)); // Clean up request

      request = null;
    }; // Handle low level network errors


    request.onerror = function handleError() {
      // Real errors are hidden from us by the browser
      // onerror should only fire if it's a network error
      reject(createError('Network Error', config, null, request)); // Clean up request

      request = null;
    }; // Handle timeout


    request.ontimeout = function handleTimeout() {
      var timeoutErrorMessage = 'timeout of ' + config.timeout + 'ms exceeded';

      if (config.timeoutErrorMessage) {
        timeoutErrorMessage = config.timeoutErrorMessage;
      }

      reject(createError(timeoutErrorMessage, config, 'ECONNABORTED', request)); // Clean up request

      request = null;
    }; // Add xsrf header
    // This is only done if running in a standard browser environment.
    // Specifically not if we're in a web worker, or react-native.


    if (utils.isStandardBrowserEnv()) {
      // Add xsrf header
      var xsrfValue = (config.withCredentials || isURLSameOrigin(fullPath)) && config.xsrfCookieName ? cookies.read(config.xsrfCookieName) : undefined;

      if (xsrfValue) {
        requestHeaders[config.xsrfHeaderName] = xsrfValue;
      }
    } // Add headers to the request


    if ('setRequestHeader' in request) {
      utils.forEach(requestHeaders, function setRequestHeader(val, key) {
        if (typeof requestData === 'undefined' && key.toLowerCase() === 'content-type') {
          // Remove Content-Type if data is undefined
          delete requestHeaders[key];
        } else {
          // Otherwise add header to the request
          request.setRequestHeader(key, val);
        }
      });
    } // Add withCredentials to request if needed


    if (!utils.isUndefined(config.withCredentials)) {
      request.withCredentials = !!config.withCredentials;
    } // Add responseType to request if needed


    if (config.responseType) {
      try {
        request.responseType = config.responseType;
      } catch (e) {
        // Expected DOMException thrown by browsers not compatible XMLHttpRequest Level 2.
        // But, this can be suppressed for 'json' type as it can be parsed by default 'transformResponse' function.
        if (config.responseType !== 'json') {
          throw e;
        }
      }
    } // Handle progress if needed


    if (typeof config.onDownloadProgress === 'function') {
      request.addEventListener('progress', config.onDownloadProgress);
    } // Not all browsers support upload events


    if (typeof config.onUploadProgress === 'function' && request.upload) {
      request.upload.addEventListener('progress', config.onUploadProgress);
    }

    if (config.cancelToken) {
      // Handle cancellation
      config.cancelToken.promise.then(function onCanceled(cancel) {
        if (!request) {
          return;
        }

        request.abort();
        reject(cancel); // Clean up request

        request = null;
      });
    }

    if (!requestData) {
      requestData = null;
    } // Send the request


    request.send(requestData);
  });
};

/***/ }),

/***/ "../node_modules/axios/lib/axios.js":
/*!******************************************!*\
  !*** ../node_modules/axios/lib/axios.js ***!
  \******************************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: module, __webpack_require__ */
/*! CommonJS bailout: module.exports is used directly at 49:0-14 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var utils = __webpack_require__(/*! ./utils */ "../node_modules/axios/lib/utils.js");

var bind = __webpack_require__(/*! ./helpers/bind */ "../node_modules/axios/lib/helpers/bind.js");

var Axios = __webpack_require__(/*! ./core/Axios */ "../node_modules/axios/lib/core/Axios.js");

var mergeConfig = __webpack_require__(/*! ./core/mergeConfig */ "../node_modules/axios/lib/core/mergeConfig.js");

var defaults = __webpack_require__(/*! ./defaults */ "../node_modules/axios/lib/defaults.js");
/**
 * Create an instance of Axios
 *
 * @param {Object} defaultConfig The default config for the instance
 * @return {Axios} A new instance of Axios
 */


function createInstance(defaultConfig) {
  var context = new Axios(defaultConfig);
  var instance = bind(Axios.prototype.request, context); // Copy axios.prototype to instance

  utils.extend(instance, Axios.prototype, context); // Copy context to instance

  utils.extend(instance, context);
  return instance;
} // Create the default instance to be exported


var axios = createInstance(defaults); // Expose Axios class to allow class inheritance

axios.Axios = Axios; // Factory for creating new instances

axios.create = function create(instanceConfig) {
  return createInstance(mergeConfig(axios.defaults, instanceConfig));
}; // Expose Cancel & CancelToken


axios.Cancel = __webpack_require__(/*! ./cancel/Cancel */ "../node_modules/axios/lib/cancel/Cancel.js");
axios.CancelToken = __webpack_require__(/*! ./cancel/CancelToken */ "../node_modules/axios/lib/cancel/CancelToken.js");
axios.isCancel = __webpack_require__(/*! ./cancel/isCancel */ "../node_modules/axios/lib/cancel/isCancel.js"); // Expose all/spread

axios.all = function all(promises) {
  return Promise.all(promises);
};

axios.spread = __webpack_require__(/*! ./helpers/spread */ "../node_modules/axios/lib/helpers/spread.js");
module.exports = axios; // Allow use of default import syntax in TypeScript

module.exports.default = axios;

/***/ }),

/***/ "../node_modules/axios/lib/cancel/Cancel.js":
/*!**************************************************!*\
  !*** ../node_modules/axios/lib/cancel/Cancel.js ***!
  \**************************************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: module */
/*! CommonJS bailout: module.exports is used directly at 18:0-14 */
/***/ ((module) => {

"use strict";

/**
 * A `Cancel` is an object that is thrown when an operation is canceled.
 *
 * @class
 * @param {string=} message The message.
 */

function Cancel(message) {
  this.message = message;
}

Cancel.prototype.toString = function toString() {
  return 'Cancel' + (this.message ? ': ' + this.message : '');
};

Cancel.prototype.__CANCEL__ = true;
module.exports = Cancel;

/***/ }),

/***/ "../node_modules/axios/lib/cancel/CancelToken.js":
/*!*******************************************************!*\
  !*** ../node_modules/axios/lib/cancel/CancelToken.js ***!
  \*******************************************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: module, __webpack_require__ */
/*! CommonJS bailout: module.exports is used directly at 59:0-14 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var Cancel = __webpack_require__(/*! ./Cancel */ "../node_modules/axios/lib/cancel/Cancel.js");
/**
 * A `CancelToken` is an object that can be used to request cancellation of an operation.
 *
 * @class
 * @param {Function} executor The executor function.
 */


function CancelToken(executor) {
  if (typeof executor !== 'function') {
    throw new TypeError('executor must be a function.');
  }

  var resolvePromise;
  this.promise = new Promise(function promiseExecutor(resolve) {
    resolvePromise = resolve;
  });
  var token = this;
  executor(function cancel(message) {
    if (token.reason) {
      // Cancellation has already been requested
      return;
    }

    token.reason = new Cancel(message);
    resolvePromise(token.reason);
  });
}
/**
 * Throws a `Cancel` if cancellation has been requested.
 */


CancelToken.prototype.throwIfRequested = function throwIfRequested() {
  if (this.reason) {
    throw this.reason;
  }
};
/**
 * Returns an object that contains a new `CancelToken` and a function that, when called,
 * cancels the `CancelToken`.
 */


CancelToken.source = function source() {
  var cancel;
  var token = new CancelToken(function executor(c) {
    cancel = c;
  });
  return {
    token: token,
    cancel: cancel
  };
};

module.exports = CancelToken;

/***/ }),

/***/ "../node_modules/axios/lib/cancel/isCancel.js":
/*!****************************************************!*\
  !*** ../node_modules/axios/lib/cancel/isCancel.js ***!
  \****************************************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: module */
/*! CommonJS bailout: module.exports is used directly at 3:0-14 */
/***/ ((module) => {

"use strict";


module.exports = function isCancel(value) {
  return !!(value && value.__CANCEL__);
};

/***/ }),

/***/ "../node_modules/axios/lib/core/Axios.js":
/*!***********************************************!*\
  !*** ../node_modules/axios/lib/core/Axios.js ***!
  \***********************************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: module, __webpack_require__ */
/*! CommonJS bailout: module.exports is used directly at 96:0-14 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "../node_modules/axios/lib/utils.js");

var buildURL = __webpack_require__(/*! ../helpers/buildURL */ "../node_modules/axios/lib/helpers/buildURL.js");

var InterceptorManager = __webpack_require__(/*! ./InterceptorManager */ "../node_modules/axios/lib/core/InterceptorManager.js");

var dispatchRequest = __webpack_require__(/*! ./dispatchRequest */ "../node_modules/axios/lib/core/dispatchRequest.js");

var mergeConfig = __webpack_require__(/*! ./mergeConfig */ "../node_modules/axios/lib/core/mergeConfig.js");
/**
 * Create a new instance of Axios
 *
 * @param {Object} instanceConfig The default config for the instance
 */


function Axios(instanceConfig) {
  this.defaults = instanceConfig;
  this.interceptors = {
    request: new InterceptorManager(),
    response: new InterceptorManager()
  };
}
/**
 * Dispatch a request
 *
 * @param {Object} config The config specific for this request (merged with this.defaults)
 */


Axios.prototype.request = function request(config) {
  /*eslint no-param-reassign:0*/
  // Allow for axios('example/url'[, config]) a la fetch API
  if (typeof config === 'string') {
    config = arguments[1] || {};
    config.url = arguments[0];
  } else {
    config = config || {};
  }

  config = mergeConfig(this.defaults, config); // Set config.method

  if (config.method) {
    config.method = config.method.toLowerCase();
  } else if (this.defaults.method) {
    config.method = this.defaults.method.toLowerCase();
  } else {
    config.method = 'get';
  } // Hook up interceptors middleware


  var chain = [dispatchRequest, undefined];
  var promise = Promise.resolve(config);
  this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
    chain.unshift(interceptor.fulfilled, interceptor.rejected);
  });
  this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
    chain.push(interceptor.fulfilled, interceptor.rejected);
  });

  while (chain.length) {
    promise = promise.then(chain.shift(), chain.shift());
  }

  return promise;
};

Axios.prototype.getUri = function getUri(config) {
  config = mergeConfig(this.defaults, config);
  return buildURL(config.url, config.params, config.paramsSerializer).replace(/^\?/, '');
}; // Provide aliases for supported request methods


utils.forEach(['delete', 'get', 'head', 'options'], function forEachMethodNoData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function (url, config) {
    return this.request(mergeConfig(config || {}, {
      method: method,
      url: url,
      data: (config || {}).data
    }));
  };
});
utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function (url, data, config) {
    return this.request(mergeConfig(config || {}, {
      method: method,
      url: url,
      data: data
    }));
  };
});
module.exports = Axios;

/***/ }),

/***/ "../node_modules/axios/lib/core/InterceptorManager.js":
/*!************************************************************!*\
  !*** ../node_modules/axios/lib/core/InterceptorManager.js ***!
  \************************************************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: module, __webpack_require__ */
/*! CommonJS bailout: module.exports is used directly at 55:0-14 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "../node_modules/axios/lib/utils.js");

function InterceptorManager() {
  this.handlers = [];
}
/**
 * Add a new interceptor to the stack
 *
 * @param {Function} fulfilled The function to handle `then` for a `Promise`
 * @param {Function} rejected The function to handle `reject` for a `Promise`
 *
 * @return {Number} An ID used to remove interceptor later
 */


InterceptorManager.prototype.use = function use(fulfilled, rejected) {
  this.handlers.push({
    fulfilled: fulfilled,
    rejected: rejected
  });
  return this.handlers.length - 1;
};
/**
 * Remove an interceptor from the stack
 *
 * @param {Number} id The ID that was returned by `use`
 */


InterceptorManager.prototype.eject = function eject(id) {
  if (this.handlers[id]) {
    this.handlers[id] = null;
  }
};
/**
 * Iterate over all the registered interceptors
 *
 * This method is particularly useful for skipping over any
 * interceptors that may have become `null` calling `eject`.
 *
 * @param {Function} fn The function to call for each interceptor
 */


InterceptorManager.prototype.forEach = function forEach(fn) {
  utils.forEach(this.handlers, function forEachHandler(h) {
    if (h !== null) {
      fn(h);
    }
  });
};

module.exports = InterceptorManager;

/***/ }),

/***/ "../node_modules/axios/lib/core/buildFullPath.js":
/*!*******************************************************!*\
  !*** ../node_modules/axios/lib/core/buildFullPath.js ***!
  \*******************************************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: module, __webpack_require__ */
/*! CommonJS bailout: module.exports is used directly at 17:0-14 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var isAbsoluteURL = __webpack_require__(/*! ../helpers/isAbsoluteURL */ "../node_modules/axios/lib/helpers/isAbsoluteURL.js");

var combineURLs = __webpack_require__(/*! ../helpers/combineURLs */ "../node_modules/axios/lib/helpers/combineURLs.js");
/**
 * Creates a new URL by combining the baseURL with the requestedURL,
 * only when the requestedURL is not already an absolute URL.
 * If the requestURL is absolute, this function returns the requestedURL untouched.
 *
 * @param {string} baseURL The base URL
 * @param {string} requestedURL Absolute or relative URL to combine
 * @returns {string} The combined full path
 */


module.exports = function buildFullPath(baseURL, requestedURL) {
  if (baseURL && !isAbsoluteURL(requestedURL)) {
    return combineURLs(baseURL, requestedURL);
  }

  return requestedURL;
};

/***/ }),

/***/ "../node_modules/axios/lib/core/createError.js":
/*!*****************************************************!*\
  !*** ../node_modules/axios/lib/core/createError.js ***!
  \*****************************************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: module, __webpack_require__ */
/*! CommonJS bailout: module.exports is used directly at 16:0-14 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var enhanceError = __webpack_require__(/*! ./enhanceError */ "../node_modules/axios/lib/core/enhanceError.js");
/**
 * Create an Error with the specified message, config, error code, request and response.
 *
 * @param {string} message The error message.
 * @param {Object} config The config.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 * @param {Object} [request] The request.
 * @param {Object} [response] The response.
 * @returns {Error} The created error.
 */


module.exports = function createError(message, config, code, request, response) {
  var error = new Error(message);
  return enhanceError(error, config, code, request, response);
};

/***/ }),

/***/ "../node_modules/axios/lib/core/dispatchRequest.js":
/*!*********************************************************!*\
  !*** ../node_modules/axios/lib/core/dispatchRequest.js ***!
  \*********************************************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: module, __webpack_require__ */
/*! CommonJS bailout: module.exports is used directly at 28:0-14 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "../node_modules/axios/lib/utils.js");

var transformData = __webpack_require__(/*! ./transformData */ "../node_modules/axios/lib/core/transformData.js");

var isCancel = __webpack_require__(/*! ../cancel/isCancel */ "../node_modules/axios/lib/cancel/isCancel.js");

var defaults = __webpack_require__(/*! ../defaults */ "../node_modules/axios/lib/defaults.js");
/**
 * Throws a `Cancel` if cancellation has been requested.
 */


function throwIfCancellationRequested(config) {
  if (config.cancelToken) {
    config.cancelToken.throwIfRequested();
  }
}
/**
 * Dispatch a request to the server using the configured adapter.
 *
 * @param {object} config The config that is to be used for the request
 * @returns {Promise} The Promise to be fulfilled
 */


module.exports = function dispatchRequest(config) {
  throwIfCancellationRequested(config); // Ensure headers exist

  config.headers = config.headers || {}; // Transform request data

  config.data = transformData(config.data, config.headers, config.transformRequest); // Flatten headers

  config.headers = utils.merge(config.headers.common || {}, config.headers[config.method] || {}, config.headers);
  utils.forEach(['delete', 'get', 'head', 'post', 'put', 'patch', 'common'], function cleanHeaderConfig(method) {
    delete config.headers[method];
  });
  var adapter = config.adapter || defaults.adapter;
  return adapter(config).then(function onAdapterResolution(response) {
    throwIfCancellationRequested(config); // Transform response data

    response.data = transformData(response.data, response.headers, config.transformResponse);
    return response;
  }, function onAdapterRejection(reason) {
    if (!isCancel(reason)) {
      throwIfCancellationRequested(config); // Transform response data

      if (reason && reason.response) {
        reason.response.data = transformData(reason.response.data, reason.response.headers, config.transformResponse);
      }
    }

    return Promise.reject(reason);
  });
};

/***/ }),

/***/ "../node_modules/axios/lib/core/enhanceError.js":
/*!******************************************************!*\
  !*** ../node_modules/axios/lib/core/enhanceError.js ***!
  \******************************************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: module */
/*! CommonJS bailout: module.exports is used directly at 13:0-14 */
/***/ ((module) => {

"use strict";

/**
 * Update an Error with the specified config, error code, and response.
 *
 * @param {Error} error The error to update.
 * @param {Object} config The config.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 * @param {Object} [request] The request.
 * @param {Object} [response] The response.
 * @returns {Error} The error.
 */

module.exports = function enhanceError(error, config, code, request, response) {
  error.config = config;

  if (code) {
    error.code = code;
  }

  error.request = request;
  error.response = response;
  error.isAxiosError = true;

  error.toJSON = function toJSON() {
    return {
      // Standard
      message: this.message,
      name: this.name,
      // Microsoft
      description: this.description,
      number: this.number,
      // Mozilla
      fileName: this.fileName,
      lineNumber: this.lineNumber,
      columnNumber: this.columnNumber,
      stack: this.stack,
      // Axios
      config: this.config,
      code: this.code
    };
  };

  return error;
};

/***/ }),

/***/ "../node_modules/axios/lib/core/mergeConfig.js":
/*!*****************************************************!*\
  !*** ../node_modules/axios/lib/core/mergeConfig.js ***!
  \*****************************************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: module, __webpack_require__ */
/*! CommonJS bailout: module.exports is used directly at 14:0-14 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var utils = __webpack_require__(/*! ../utils */ "../node_modules/axios/lib/utils.js");
/**
 * Config-specific merge-function which creates a new config-object
 * by merging two configuration objects together.
 *
 * @param {Object} config1
 * @param {Object} config2
 * @returns {Object} New object resulting from merging config2 to config1
 */


module.exports = function mergeConfig(config1, config2) {
  // eslint-disable-next-line no-param-reassign
  config2 = config2 || {};
  var config = {};
  var valueFromConfig2Keys = ['url', 'method', 'data'];
  var mergeDeepPropertiesKeys = ['headers', 'auth', 'proxy', 'params'];
  var defaultToConfig2Keys = ['baseURL', 'transformRequest', 'transformResponse', 'paramsSerializer', 'timeout', 'timeoutMessage', 'withCredentials', 'adapter', 'responseType', 'xsrfCookieName', 'xsrfHeaderName', 'onUploadProgress', 'onDownloadProgress', 'decompress', 'maxContentLength', 'maxBodyLength', 'maxRedirects', 'transport', 'httpAgent', 'httpsAgent', 'cancelToken', 'socketPath', 'responseEncoding'];
  var directMergeKeys = ['validateStatus'];

  function getMergedValue(target, source) {
    if (utils.isPlainObject(target) && utils.isPlainObject(source)) {
      return utils.merge(target, source);
    } else if (utils.isPlainObject(source)) {
      return utils.merge({}, source);
    } else if (utils.isArray(source)) {
      return source.slice();
    }

    return source;
  }

  function mergeDeepProperties(prop) {
    if (!utils.isUndefined(config2[prop])) {
      config[prop] = getMergedValue(config1[prop], config2[prop]);
    } else if (!utils.isUndefined(config1[prop])) {
      config[prop] = getMergedValue(undefined, config1[prop]);
    }
  }

  utils.forEach(valueFromConfig2Keys, function valueFromConfig2(prop) {
    if (!utils.isUndefined(config2[prop])) {
      config[prop] = getMergedValue(undefined, config2[prop]);
    }
  });
  utils.forEach(mergeDeepPropertiesKeys, mergeDeepProperties);
  utils.forEach(defaultToConfig2Keys, function defaultToConfig2(prop) {
    if (!utils.isUndefined(config2[prop])) {
      config[prop] = getMergedValue(undefined, config2[prop]);
    } else if (!utils.isUndefined(config1[prop])) {
      config[prop] = getMergedValue(undefined, config1[prop]);
    }
  });
  utils.forEach(directMergeKeys, function merge(prop) {
    if (prop in config2) {
      config[prop] = getMergedValue(config1[prop], config2[prop]);
    } else if (prop in config1) {
      config[prop] = getMergedValue(undefined, config1[prop]);
    }
  });
  var axiosKeys = valueFromConfig2Keys.concat(mergeDeepPropertiesKeys).concat(defaultToConfig2Keys).concat(directMergeKeys);
  var otherKeys = Object.keys(config1).concat(Object.keys(config2)).filter(function filterAxiosKeys(key) {
    return axiosKeys.indexOf(key) === -1;
  });
  utils.forEach(otherKeys, mergeDeepProperties);
  return config;
};

/***/ }),

/***/ "../node_modules/axios/lib/core/settle.js":
/*!************************************************!*\
  !*** ../node_modules/axios/lib/core/settle.js ***!
  \************************************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: module, __webpack_require__ */
/*! CommonJS bailout: module.exports is used directly at 13:0-14 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var createError = __webpack_require__(/*! ./createError */ "../node_modules/axios/lib/core/createError.js");
/**
 * Resolve or reject a Promise based on response status.
 *
 * @param {Function} resolve A function that resolves the promise.
 * @param {Function} reject A function that rejects the promise.
 * @param {object} response The response.
 */


module.exports = function settle(resolve, reject, response) {
  var validateStatus = response.config.validateStatus;

  if (!response.status || !validateStatus || validateStatus(response.status)) {
    resolve(response);
  } else {
    reject(createError('Request failed with status code ' + response.status, response.config, null, response.request, response));
  }
};

/***/ }),

/***/ "../node_modules/axios/lib/core/transformData.js":
/*!*******************************************************!*\
  !*** ../node_modules/axios/lib/core/transformData.js ***!
  \*******************************************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: module, __webpack_require__ */
/*! CommonJS bailout: module.exports is used directly at 14:0-14 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "../node_modules/axios/lib/utils.js");
/**
 * Transform the data for a request or a response
 *
 * @param {Object|String} data The data to be transformed
 * @param {Array} headers The headers for the request or response
 * @param {Array|Function} fns A single function or Array of functions
 * @returns {*} The resulting transformed data
 */


module.exports = function transformData(data, headers, fns) {
  /*eslint no-param-reassign:0*/
  utils.forEach(fns, function transform(fn) {
    data = fn(data, headers);
  });
  return data;
};

/***/ }),

/***/ "../node_modules/axios/lib/defaults.js":
/*!*********************************************!*\
  !*** ../node_modules/axios/lib/defaults.js ***!
  \*********************************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: module, __webpack_require__ */
/*! CommonJS bailout: module.exports is used directly at 94:0-14 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var utils = __webpack_require__(/*! ./utils */ "../node_modules/axios/lib/utils.js");

var normalizeHeaderName = __webpack_require__(/*! ./helpers/normalizeHeaderName */ "../node_modules/axios/lib/helpers/normalizeHeaderName.js");

var DEFAULT_CONTENT_TYPE = {
  'Content-Type': 'application/x-www-form-urlencoded'
};

function setContentTypeIfUnset(headers, value) {
  if (!utils.isUndefined(headers) && utils.isUndefined(headers['Content-Type'])) {
    headers['Content-Type'] = value;
  }
}

function getDefaultAdapter() {
  var adapter;

  if (typeof XMLHttpRequest !== 'undefined') {
    // For browsers use XHR adapter
    adapter = __webpack_require__(/*! ./adapters/xhr */ "../node_modules/axios/lib/adapters/xhr.js");
  } else if (typeof process !== 'undefined' && Object.prototype.toString.call(process) === '[object process]') {
    // For node use HTTP adapter
    adapter = __webpack_require__(/*! ./adapters/http */ "../node_modules/axios/lib/adapters/xhr.js");
  }

  return adapter;
}

var defaults = {
  adapter: getDefaultAdapter(),
  transformRequest: [function transformRequest(data, headers) {
    normalizeHeaderName(headers, 'Accept');
    normalizeHeaderName(headers, 'Content-Type');

    if (utils.isFormData(data) || utils.isArrayBuffer(data) || utils.isBuffer(data) || utils.isStream(data) || utils.isFile(data) || utils.isBlob(data)) {
      return data;
    }

    if (utils.isArrayBufferView(data)) {
      return data.buffer;
    }

    if (utils.isURLSearchParams(data)) {
      setContentTypeIfUnset(headers, 'application/x-www-form-urlencoded;charset=utf-8');
      return data.toString();
    }

    if (utils.isObject(data)) {
      setContentTypeIfUnset(headers, 'application/json;charset=utf-8');
      return JSON.stringify(data);
    }

    return data;
  }],
  transformResponse: [function transformResponse(data) {
    /*eslint no-param-reassign:0*/
    if (typeof data === 'string') {
      try {
        data = JSON.parse(data);
      } catch (e) {
        /* Ignore */
      }
    }

    return data;
  }],

  /**
   * A timeout in milliseconds to abort a request. If set to 0 (default) a
   * timeout is not created.
   */
  timeout: 0,
  xsrfCookieName: 'XSRF-TOKEN',
  xsrfHeaderName: 'X-XSRF-TOKEN',
  maxContentLength: -1,
  maxBodyLength: -1,
  validateStatus: function validateStatus(status) {
    return status >= 200 && status < 300;
  }
};
defaults.headers = {
  common: {
    'Accept': 'application/json, text/plain, */*'
  }
};
utils.forEach(['delete', 'get', 'head'], function forEachMethodNoData(method) {
  defaults.headers[method] = {};
});
utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  defaults.headers[method] = utils.merge(DEFAULT_CONTENT_TYPE);
});
module.exports = defaults;

/***/ }),

/***/ "../node_modules/axios/lib/helpers/bind.js":
/*!*************************************************!*\
  !*** ../node_modules/axios/lib/helpers/bind.js ***!
  \*************************************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: module */
/*! CommonJS bailout: module.exports is used directly at 3:0-14 */
/***/ ((module) => {

"use strict";


module.exports = function bind(fn, thisArg) {
  return function wrap() {
    var args = new Array(arguments.length);

    for (var i = 0; i < args.length; i++) {
      args[i] = arguments[i];
    }

    return fn.apply(thisArg, args);
  };
};

/***/ }),

/***/ "../node_modules/axios/lib/helpers/buildURL.js":
/*!*****************************************************!*\
  !*** ../node_modules/axios/lib/helpers/buildURL.js ***!
  \*****************************************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: module, __webpack_require__ */
/*! CommonJS bailout: module.exports is used directly at 17:0-14 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "../node_modules/axios/lib/utils.js");

function encode(val) {
  return encodeURIComponent(val).replace(/%3A/gi, ':').replace(/%24/g, '$').replace(/%2C/gi, ',').replace(/%20/g, '+').replace(/%5B/gi, '[').replace(/%5D/gi, ']');
}
/**
 * Build a URL by appending params to the end
 *
 * @param {string} url The base of the url (e.g., http://www.google.com)
 * @param {object} [params] The params to be appended
 * @returns {string} The formatted url
 */


module.exports = function buildURL(url, params, paramsSerializer) {
  /*eslint no-param-reassign:0*/
  if (!params) {
    return url;
  }

  var serializedParams;

  if (paramsSerializer) {
    serializedParams = paramsSerializer(params);
  } else if (utils.isURLSearchParams(params)) {
    serializedParams = params.toString();
  } else {
    var parts = [];
    utils.forEach(params, function serialize(val, key) {
      if (val === null || typeof val === 'undefined') {
        return;
      }

      if (utils.isArray(val)) {
        key = key + '[]';
      } else {
        val = [val];
      }

      utils.forEach(val, function parseValue(v) {
        if (utils.isDate(v)) {
          v = v.toISOString();
        } else if (utils.isObject(v)) {
          v = JSON.stringify(v);
        }

        parts.push(encode(key) + '=' + encode(v));
      });
    });
    serializedParams = parts.join('&');
  }

  if (serializedParams) {
    var hashmarkIndex = url.indexOf('#');

    if (hashmarkIndex !== -1) {
      url = url.slice(0, hashmarkIndex);
    }

    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams;
  }

  return url;
};

/***/ }),

/***/ "../node_modules/axios/lib/helpers/combineURLs.js":
/*!********************************************************!*\
  !*** ../node_modules/axios/lib/helpers/combineURLs.js ***!
  \********************************************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: module */
/*! CommonJS bailout: module.exports is used directly at 10:0-14 */
/***/ ((module) => {

"use strict";

/**
 * Creates a new URL by combining the specified URLs
 *
 * @param {string} baseURL The base URL
 * @param {string} relativeURL The relative URL
 * @returns {string} The combined URL
 */

module.exports = function combineURLs(baseURL, relativeURL) {
  return relativeURL ? baseURL.replace(/\/+$/, '') + '/' + relativeURL.replace(/^\/+/, '') : baseURL;
};

/***/ }),

/***/ "../node_modules/axios/lib/helpers/cookies.js":
/*!****************************************************!*\
  !*** ../node_modules/axios/lib/helpers/cookies.js ***!
  \****************************************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: module, __webpack_require__ */
/*! CommonJS bailout: module.exports is used directly at 5:0-14 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "../node_modules/axios/lib/utils.js");

module.exports = utils.isStandardBrowserEnv() ? // Standard browser envs support document.cookie
function standardBrowserEnv() {
  return {
    write: function write(name, value, expires, path, domain, secure) {
      var cookie = [];
      cookie.push(name + '=' + encodeURIComponent(value));

      if (utils.isNumber(expires)) {
        cookie.push('expires=' + new Date(expires).toGMTString());
      }

      if (utils.isString(path)) {
        cookie.push('path=' + path);
      }

      if (utils.isString(domain)) {
        cookie.push('domain=' + domain);
      }

      if (secure === true) {
        cookie.push('secure');
      }

      document.cookie = cookie.join('; ');
    },
    read: function read(name) {
      var match = document.cookie.match(new RegExp('(^|;\\s*)(' + name + ')=([^;]*)'));
      return match ? decodeURIComponent(match[3]) : null;
    },
    remove: function remove(name) {
      this.write(name, '', Date.now() - 86400000);
    }
  };
}() : // Non standard browser env (web workers, react-native) lack needed support.
function nonStandardBrowserEnv() {
  return {
    write: function write() {},
    read: function read() {
      return null;
    },
    remove: function remove() {}
  };
}();

/***/ }),

/***/ "../node_modules/axios/lib/helpers/isAbsoluteURL.js":
/*!**********************************************************!*\
  !*** ../node_modules/axios/lib/helpers/isAbsoluteURL.js ***!
  \**********************************************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: module */
/*! CommonJS bailout: module.exports is used directly at 9:0-14 */
/***/ ((module) => {

"use strict";

/**
 * Determines whether the specified URL is absolute
 *
 * @param {string} url The URL to test
 * @returns {boolean} True if the specified URL is absolute, otherwise false
 */

module.exports = function isAbsoluteURL(url) {
  // A URL is considered absolute if it begins with "<scheme>://" or "//" (protocol-relative URL).
  // RFC 3986 defines scheme name as a sequence of characters beginning with a letter and followed
  // by any combination of letters, digits, plus, period, or hyphen.
  return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(url);
};

/***/ }),

/***/ "../node_modules/axios/lib/helpers/isURLSameOrigin.js":
/*!************************************************************!*\
  !*** ../node_modules/axios/lib/helpers/isURLSameOrigin.js ***!
  \************************************************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: module, __webpack_require__ */
/*! CommonJS bailout: module.exports is used directly at 5:0-14 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "../node_modules/axios/lib/utils.js");

module.exports = utils.isStandardBrowserEnv() ? // Standard browser envs have full support of the APIs needed to test
// whether the request URL is of the same origin as current location.
function standardBrowserEnv() {
  var msie = /(msie|trident)/i.test(navigator.userAgent);
  var urlParsingNode = document.createElement('a');
  var originURL;
  /**
  * Parse a URL to discover it's components
  *
  * @param {String} url The URL to be parsed
  * @returns {Object}
  */

  function resolveURL(url) {
    var href = url;

    if (msie) {
      // IE needs attribute set twice to normalize properties
      urlParsingNode.setAttribute('href', href);
      href = urlParsingNode.href;
    }

    urlParsingNode.setAttribute('href', href); // urlParsingNode provides the UrlUtils interface - http://url.spec.whatwg.org/#urlutils

    return {
      href: urlParsingNode.href,
      protocol: urlParsingNode.protocol ? urlParsingNode.protocol.replace(/:$/, '') : '',
      host: urlParsingNode.host,
      search: urlParsingNode.search ? urlParsingNode.search.replace(/^\?/, '') : '',
      hash: urlParsingNode.hash ? urlParsingNode.hash.replace(/^#/, '') : '',
      hostname: urlParsingNode.hostname,
      port: urlParsingNode.port,
      pathname: urlParsingNode.pathname.charAt(0) === '/' ? urlParsingNode.pathname : '/' + urlParsingNode.pathname
    };
  }

  originURL = resolveURL(window.location.href);
  /**
  * Determine if a URL shares the same origin as the current location
  *
  * @param {String} requestURL The URL to test
  * @returns {boolean} True if URL shares the same origin, otherwise false
  */

  return function isURLSameOrigin(requestURL) {
    var parsed = utils.isString(requestURL) ? resolveURL(requestURL) : requestURL;
    return parsed.protocol === originURL.protocol && parsed.host === originURL.host;
  };
}() : // Non standard browser envs (web workers, react-native) lack needed support.
function nonStandardBrowserEnv() {
  return function isURLSameOrigin() {
    return true;
  };
}();

/***/ }),

/***/ "../node_modules/axios/lib/helpers/normalizeHeaderName.js":
/*!****************************************************************!*\
  !*** ../node_modules/axios/lib/helpers/normalizeHeaderName.js ***!
  \****************************************************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: module, __webpack_require__ */
/*! CommonJS bailout: module.exports is used directly at 5:0-14 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var utils = __webpack_require__(/*! ../utils */ "../node_modules/axios/lib/utils.js");

module.exports = function normalizeHeaderName(headers, normalizedName) {
  utils.forEach(headers, function processHeader(value, name) {
    if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
      headers[normalizedName] = value;
      delete headers[name];
    }
  });
};

/***/ }),

/***/ "../node_modules/axios/lib/helpers/parseHeaders.js":
/*!*********************************************************!*\
  !*** ../node_modules/axios/lib/helpers/parseHeaders.js ***!
  \*********************************************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: module, __webpack_require__ */
/*! CommonJS bailout: module.exports is used directly at 22:0-14 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "../node_modules/axios/lib/utils.js"); // Headers whose duplicates are ignored by node
// c.f. https://nodejs.org/api/http.html#http_message_headers


var ignoreDuplicateOf = ['age', 'authorization', 'content-length', 'content-type', 'etag', 'expires', 'from', 'host', 'if-modified-since', 'if-unmodified-since', 'last-modified', 'location', 'max-forwards', 'proxy-authorization', 'referer', 'retry-after', 'user-agent'];
/**
 * Parse headers into an object
 *
 * ```
 * Date: Wed, 27 Aug 2014 08:58:49 GMT
 * Content-Type: application/json
 * Connection: keep-alive
 * Transfer-Encoding: chunked
 * ```
 *
 * @param {String} headers Headers needing to be parsed
 * @returns {Object} Headers parsed into an object
 */

module.exports = function parseHeaders(headers) {
  var parsed = {};
  var key;
  var val;
  var i;

  if (!headers) {
    return parsed;
  }

  utils.forEach(headers.split('\n'), function parser(line) {
    i = line.indexOf(':');
    key = utils.trim(line.substr(0, i)).toLowerCase();
    val = utils.trim(line.substr(i + 1));

    if (key) {
      if (parsed[key] && ignoreDuplicateOf.indexOf(key) >= 0) {
        return;
      }

      if (key === 'set-cookie') {
        parsed[key] = (parsed[key] ? parsed[key] : []).concat([val]);
      } else {
        parsed[key] = parsed[key] ? parsed[key] + ', ' + val : val;
      }
    }
  });
  return parsed;
};

/***/ }),

/***/ "../node_modules/axios/lib/helpers/spread.js":
/*!***************************************************!*\
  !*** ../node_modules/axios/lib/helpers/spread.js ***!
  \***************************************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: module */
/*! CommonJS bailout: module.exports is used directly at 23:0-14 */
/***/ ((module) => {

"use strict";

/**
 * Syntactic sugar for invoking a function and expanding an array for arguments.
 *
 * Common use case would be to use `Function.prototype.apply`.
 *
 *  ```js
 *  function f(x, y, z) {}
 *  var args = [1, 2, 3];
 *  f.apply(null, args);
 *  ```
 *
 * With `spread` this example can be re-written.
 *
 *  ```js
 *  spread(function(x, y, z) {})([1, 2, 3]);
 *  ```
 *
 * @param {Function} callback
 * @returns {Function}
 */

module.exports = function spread(callback) {
  return function wrap(arr) {
    return callback.apply(null, arr);
  };
};

/***/ }),

/***/ "../node_modules/axios/lib/utils.js":
/*!******************************************!*\
  !*** ../node_modules/axios/lib/utils.js ***!
  \******************************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: module, __webpack_require__ */
/*! CommonJS bailout: module.exports is used directly at 350:0-14 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var bind = __webpack_require__(/*! ./helpers/bind */ "../node_modules/axios/lib/helpers/bind.js");
/*global toString:true*/
// utils is a library of generic helper functions non-specific to axios


var toString = Object.prototype.toString;
/**
 * Determine if a value is an Array
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Array, otherwise false
 */

function isArray(val) {
  return toString.call(val) === '[object Array]';
}
/**
 * Determine if a value is undefined
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if the value is undefined, otherwise false
 */


function isUndefined(val) {
  return typeof val === 'undefined';
}
/**
 * Determine if a value is a Buffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Buffer, otherwise false
 */


function isBuffer(val) {
  return val !== null && !isUndefined(val) && val.constructor !== null && !isUndefined(val.constructor) && typeof val.constructor.isBuffer === 'function' && val.constructor.isBuffer(val);
}
/**
 * Determine if a value is an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an ArrayBuffer, otherwise false
 */


function isArrayBuffer(val) {
  return toString.call(val) === '[object ArrayBuffer]';
}
/**
 * Determine if a value is a FormData
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an FormData, otherwise false
 */


function isFormData(val) {
  return typeof FormData !== 'undefined' && val instanceof FormData;
}
/**
 * Determine if a value is a view on an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a view on an ArrayBuffer, otherwise false
 */


function isArrayBufferView(val) {
  var result;

  if (typeof ArrayBuffer !== 'undefined' && ArrayBuffer.isView) {
    result = ArrayBuffer.isView(val);
  } else {
    result = val && val.buffer && val.buffer instanceof ArrayBuffer;
  }

  return result;
}
/**
 * Determine if a value is a String
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a String, otherwise false
 */


function isString(val) {
  return typeof val === 'string';
}
/**
 * Determine if a value is a Number
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Number, otherwise false
 */


function isNumber(val) {
  return typeof val === 'number';
}
/**
 * Determine if a value is an Object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Object, otherwise false
 */


function isObject(val) {
  return val !== null && typeof val === 'object';
}
/**
 * Determine if a value is a plain Object
 *
 * @param {Object} val The value to test
 * @return {boolean} True if value is a plain Object, otherwise false
 */


function isPlainObject(val) {
  if (toString.call(val) !== '[object Object]') {
    return false;
  }

  var prototype = Object.getPrototypeOf(val);
  return prototype === null || prototype === Object.prototype;
}
/**
 * Determine if a value is a Date
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Date, otherwise false
 */


function isDate(val) {
  return toString.call(val) === '[object Date]';
}
/**
 * Determine if a value is a File
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a File, otherwise false
 */


function isFile(val) {
  return toString.call(val) === '[object File]';
}
/**
 * Determine if a value is a Blob
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Blob, otherwise false
 */


function isBlob(val) {
  return toString.call(val) === '[object Blob]';
}
/**
 * Determine if a value is a Function
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Function, otherwise false
 */


function isFunction(val) {
  return toString.call(val) === '[object Function]';
}
/**
 * Determine if a value is a Stream
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Stream, otherwise false
 */


function isStream(val) {
  return isObject(val) && isFunction(val.pipe);
}
/**
 * Determine if a value is a URLSearchParams object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a URLSearchParams object, otherwise false
 */


function isURLSearchParams(val) {
  return typeof URLSearchParams !== 'undefined' && val instanceof URLSearchParams;
}
/**
 * Trim excess whitespace off the beginning and end of a string
 *
 * @param {String} str The String to trim
 * @returns {String} The String freed of excess whitespace
 */


function trim(str) {
  return str.replace(/^\s*/, '').replace(/\s*$/, '');
}
/**
 * Determine if we're running in a standard browser environment
 *
 * This allows axios to run in a web worker, and react-native.
 * Both environments support XMLHttpRequest, but not fully standard globals.
 *
 * web workers:
 *  typeof window -> undefined
 *  typeof document -> undefined
 *
 * react-native:
 *  navigator.product -> 'ReactNative'
 * nativescript
 *  navigator.product -> 'NativeScript' or 'NS'
 */


function isStandardBrowserEnv() {
  if (typeof navigator !== 'undefined' && (navigator.product === 'ReactNative' || navigator.product === 'NativeScript' || navigator.product === 'NS')) {
    return false;
  }

  return typeof window !== 'undefined' && typeof document !== 'undefined';
}
/**
 * Iterate over an Array or an Object invoking a function for each item.
 *
 * If `obj` is an Array callback will be called passing
 * the value, index, and complete array for each item.
 *
 * If 'obj' is an Object callback will be called passing
 * the value, key, and complete object for each property.
 *
 * @param {Object|Array} obj The object to iterate
 * @param {Function} fn The callback to invoke for each item
 */


function forEach(obj, fn) {
  // Don't bother if no value provided
  if (obj === null || typeof obj === 'undefined') {
    return;
  } // Force an array if not already something iterable


  if (typeof obj !== 'object') {
    /*eslint no-param-reassign:0*/
    obj = [obj];
  }

  if (isArray(obj)) {
    // Iterate over array values
    for (var i = 0, l = obj.length; i < l; i++) {
      fn.call(null, obj[i], i, obj);
    }
  } else {
    // Iterate over object keys
    for (var key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        fn.call(null, obj[key], key, obj);
      }
    }
  }
}
/**
 * Accepts varargs expecting each argument to be an object, then
 * immutably merges the properties of each object and returns result.
 *
 * When multiple objects contain the same key the later object in
 * the arguments list will take precedence.
 *
 * Example:
 *
 * ```js
 * var result = merge({foo: 123}, {foo: 456});
 * console.log(result.foo); // outputs 456
 * ```
 *
 * @param {Object} obj1 Object to merge
 * @returns {Object} Result of all merge properties
 */


function merge()
/* obj1, obj2, obj3, ... */
{
  var result = {};

  function assignValue(val, key) {
    if (isPlainObject(result[key]) && isPlainObject(val)) {
      result[key] = merge(result[key], val);
    } else if (isPlainObject(val)) {
      result[key] = merge({}, val);
    } else if (isArray(val)) {
      result[key] = val.slice();
    } else {
      result[key] = val;
    }
  }

  for (var i = 0, l = arguments.length; i < l; i++) {
    forEach(arguments[i], assignValue);
  }

  return result;
}
/**
 * Extends object a by mutably adding to it the properties of object b.
 *
 * @param {Object} a The object to be extended
 * @param {Object} b The object to copy properties from
 * @param {Object} thisArg The object to bind function to
 * @return {Object} The resulting value of object a
 */


function extend(a, b, thisArg) {
  forEach(b, function assignValue(val, key) {
    if (thisArg && typeof val === 'function') {
      a[key] = bind(val, thisArg);
    } else {
      a[key] = val;
    }
  });
  return a;
}
/**
 * Remove byte order marker. This catches EF BB BF (the UTF-8 BOM)
 *
 * @param {string} content with BOM
 * @return {string} content value without BOM
 */


function stripBOM(content) {
  if (content.charCodeAt(0) === 0xFEFF) {
    content = content.slice(1);
  }

  return content;
}

module.exports = {
  isArray: isArray,
  isArrayBuffer: isArrayBuffer,
  isBuffer: isBuffer,
  isFormData: isFormData,
  isArrayBufferView: isArrayBufferView,
  isString: isString,
  isNumber: isNumber,
  isObject: isObject,
  isPlainObject: isPlainObject,
  isUndefined: isUndefined,
  isDate: isDate,
  isFile: isFile,
  isBlob: isBlob,
  isFunction: isFunction,
  isStream: isStream,
  isURLSearchParams: isURLSearchParams,
  isStandardBrowserEnv: isStandardBrowserEnv,
  forEach: forEach,
  merge: merge,
  extend: extend,
  trim: trim,
  stripBOM: stripBOM
};

/***/ }),

/***/ "./axios-request.js":
/*!**************************!*\
  !*** ./axios-request.js ***!
  \**************************/
/*! namespace exports */
/*! export default [provided] [maybe used in main (runtime-defined)] [usage prevents renaming] */
/*! other exports [not provided] [maybe used in main (runtime-defined)] */
/*! runtime requirements: __webpack_require__, __webpack_require__.n, __webpack_exports__, __webpack_require__.r, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! axios */ "../node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_0__);
function cov_2phzhz2hb2() {
  var path = "/Users/juliovedovatto-desktop/Projects/Konnng/labs/axios-request/src/axios-request.js";
  var hash = "4d2b2589e1e58fd019bb4eb5c1fda8f31c35c78d";
  var global = new Function("return this")();
  var gcv = "__coverage__";
  var coverageData = {
    path: "/Users/juliovedovatto-desktop/Projects/Konnng/labs/axios-request/src/axios-request.js",
    statementMap: {
      "0": {
        start: {
          line: 5,
          column: 8
        },
        end: {
          line: 5,
          column: 27
        }
      },
      "1": {
        start: {
          line: 6,
          column: 8
        },
        end: {
          line: 6,
          column: 32
        }
      },
      "2": {
        start: {
          line: 7,
          column: 8
        },
        end: {
          line: 7,
          column: 26
        }
      },
      "3": {
        start: {
          line: 8,
          column: 8
        },
        end: {
          line: 8,
          column: 27
        }
      },
      "4": {
        start: {
          line: 9,
          column: 8
        },
        end: {
          line: 9,
          column: 36
        }
      },
      "5": {
        start: {
          line: 10,
          column: 8
        },
        end: {
          line: 13,
          column: 10
        }
      },
      "6": {
        start: {
          line: 14,
          column: 8
        },
        end: {
          line: 14,
          column: 33
        }
      },
      "7": {
        start: {
          line: 15,
          column: 8
        },
        end: {
          line: 15,
          column: 25
        }
      },
      "8": {
        start: {
          line: 17,
          column: 17
        },
        end: {
          line: 19,
          column: 5
        }
      },
      "9": {
        start: {
          line: 18,
          column: 8
        },
        end: {
          line: 18,
          column: 59
        }
      },
      "10": {
        start: {
          line: 20,
          column: 13
        },
        end: {
          line: 22,
          column: 5
        }
      },
      "11": {
        start: {
          line: 21,
          column: 8
        },
        end: {
          line: 21,
          column: 23
        }
      },
      "12": {
        start: {
          line: 23,
          column: 17
        },
        end: {
          line: 25,
          column: 5
        }
      },
      "13": {
        start: {
          line: 24,
          column: 8
        },
        end: {
          line: 24,
          column: 40
        }
      },
      "14": {
        start: {
          line: 26,
          column: 13
        },
        end: {
          line: 43,
          column: 5
        }
      },
      "15": {
        start: {
          line: 27,
          column: 8
        },
        end: {
          line: 41,
          column: 9
        }
      },
      "16": {
        start: {
          line: 28,
          column: 27
        },
        end: {
          line: 28,
          column: 53
        }
      },
      "17": {
        start: {
          line: 29,
          column: 28
        },
        end: {
          line: 29,
          column: 49
        }
      },
      "18": {
        start: {
          line: 31,
          column: 12
        },
        end: {
          line: 33,
          column: 13
        }
      },
      "19": {
        start: {
          line: 32,
          column: 16
        },
        end: {
          line: 32,
          column: 25
        }
      },
      "20": {
        start: {
          line: 34,
          column: 12
        },
        end: {
          line: 36,
          column: 13
        }
      },
      "21": {
        start: {
          line: 35,
          column: 16
        },
        end: {
          line: 35,
          column: 38
        }
      },
      "22": {
        start: {
          line: 38,
          column: 12
        },
        end: {
          line: 38,
          column: 100
        }
      },
      "23": {
        start: {
          line: 38,
          column: 66
        },
        end: {
          line: 38,
          column: 97
        }
      },
      "24": {
        start: {
          line: 39,
          column: 12
        },
        end: {
          line: 40,
          column: 80
        }
      },
      "25": {
        start: {
          line: 40,
          column: 39
        },
        end: {
          line: 40,
          column: 77
        }
      },
      "26": {
        start: {
          line: 42,
          column: 8
        },
        end: {
          line: 42,
          column: 20
        }
      },
      "27": {
        start: {
          line: 44,
          column: 16
        },
        end: {
          line: 49,
          column: 5
        }
      },
      "28": {
        start: {
          line: 45,
          column: 8
        },
        end: {
          line: 47,
          column: 9
        }
      },
      "29": {
        start: {
          line: 46,
          column: 12
        },
        end: {
          line: 46,
          column: 42
        }
      },
      "30": {
        start: {
          line: 48,
          column: 8
        },
        end: {
          line: 48,
          column: 92
        }
      },
      "31": {
        start: {
          line: 48,
          column: 63
        },
        end: {
          line: 48,
          column: 90
        }
      },
      "32": {
        start: {
          line: 50,
          column: 16
        },
        end: {
          line: 56,
          column: 5
        }
      },
      "33": {
        start: {
          line: 51,
          column: 8
        },
        end: {
          line: 53,
          column: 9
        }
      },
      "34": {
        start: {
          line: 52,
          column: 12
        },
        end: {
          line: 52,
          column: 52
        }
      },
      "35": {
        start: {
          line: 54,
          column: 8
        },
        end: {
          line: 55,
          column: 74
        }
      },
      "36": {
        start: {
          line: 55,
          column: 35
        },
        end: {
          line: 55,
          column: 72
        }
      },
      "37": {
        start: {
          line: 57,
          column: 17
        },
        end: {
          line: 62,
          column: 5
        }
      },
      "38": {
        start: {
          line: 58,
          column: 8
        },
        end: {
          line: 60,
          column: 9
        }
      },
      "39": {
        start: {
          line: 59,
          column: 12
        },
        end: {
          line: 59,
          column: 43
        }
      },
      "40": {
        start: {
          line: 61,
          column: 8
        },
        end: {
          line: 61,
          column: 96
        }
      },
      "41": {
        start: {
          line: 61,
          column: 65
        },
        end: {
          line: 61,
          column: 94
        }
      },
      "42": {
        start: {
          line: 63,
          column: 26
        },
        end: {
          line: 66,
          column: 5
        }
      },
      "43": {
        start: {
          line: 64,
          column: 8
        },
        end: {
          line: 64,
          column: 37
        }
      },
      "44": {
        start: {
          line: 65,
          column: 8
        },
        end: {
          line: 65,
          column: 38
        }
      },
      "45": {
        start: {
          line: 67,
          column: 30
        },
        end: {
          line: 70,
          column: 5
        }
      },
      "46": {
        start: {
          line: 68,
          column: 8
        },
        end: {
          line: 68,
          column: 41
        }
      },
      "47": {
        start: {
          line: 69,
          column: 8
        },
        end: {
          line: 69,
          column: 24
        }
      },
      "48": {
        start: {
          line: 71,
          column: 31
        },
        end: {
          line: 79,
          column: 5
        }
      },
      "49": {
        start: {
          line: 72,
          column: 8
        },
        end: {
          line: 72,
          column: 41
        }
      },
      "50": {
        start: {
          line: 73,
          column: 8
        },
        end: {
          line: 73,
          column: 47
        }
      },
      "51": {
        start: {
          line: 74,
          column: 8
        },
        end: {
          line: 78,
          column: 9
        }
      },
      "52": {
        start: {
          line: 75,
          column: 12
        },
        end: {
          line: 75,
          column: 53
        }
      },
      "53": {
        start: {
          line: 77,
          column: 12
        },
        end: {
          line: 77,
          column: 24
        }
      },
      "54": {
        start: {
          line: 80,
          column: 11
        },
        end: {
          line: 83,
          column: 6
        }
      },
      "55": {
        start: {
          line: 80,
          column: 20
        },
        end: {
          line: 83,
          column: 5
        }
      },
      "56": {
        start: {
          line: 81,
          column: 30
        },
        end: {
          line: 81,
          column: 75
        }
      },
      "57": {
        start: {
          line: 82,
          column: 31
        },
        end: {
          line: 82,
          column: 77
        }
      },
      "58": {
        start: {
          line: 84,
          column: 10
        },
        end: {
          line: 84,
          column: 53
        }
      },
      "59": {
        start: {
          line: 84,
          column: 21
        },
        end: {
          line: 84,
          column: 53
        }
      },
      "60": {
        start: {
          line: 85,
          column: 11
        },
        end: {
          line: 85,
          column: 55
        }
      },
      "61": {
        start: {
          line: 85,
          column: 22
        },
        end: {
          line: 85,
          column: 55
        }
      },
      "62": {
        start: {
          line: 86,
          column: 21
        },
        end: {
          line: 102,
          column: 10
        }
      },
      "63": {
        start: {
          line: 87,
          column: 8
        },
        end: {
          line: 102,
          column: 10
        }
      },
      "64": {
        start: {
          line: 88,
          column: 12
        },
        end: {
          line: 88,
          column: 50
        }
      },
      "65": {
        start: {
          line: 90,
          column: 12
        },
        end: {
          line: 92,
          column: 13
        }
      },
      "66": {
        start: {
          line: 91,
          column: 16
        },
        end: {
          line: 91,
          column: 47
        }
      },
      "67": {
        start: {
          line: 93,
          column: 12
        },
        end: {
          line: 100,
          column: 13
        }
      },
      "68": {
        start: {
          line: 94,
          column: 32
        },
        end: {
          line: 96,
          column: 24
        }
      },
      "69": {
        start: {
          line: 95,
          column: 20
        },
        end: {
          line: 95,
          column: 73
        }
      },
      "70": {
        start: {
          line: 97,
          column: 16
        },
        end: {
          line: 97,
          column: 49
        }
      },
      "71": {
        start: {
          line: 99,
          column: 16
        },
        end: {
          line: 99,
          column: 55
        }
      },
      "72": {
        start: {
          line: 101,
          column: 12
        },
        end: {
          line: 101,
          column: 28
        }
      },
      "73": {
        start: {
          line: 103,
          column: 18
        },
        end: {
          line: 133,
          column: 5
        }
      },
      "74": {
        start: {
          line: 109,
          column: 12
        },
        end: {
          line: 109,
          column: 52
        }
      },
      "75": {
        start: {
          line: 111,
          column: 25
        },
        end: {
          line: 112,
          column: 84
        }
      },
      "76": {
        start: {
          line: 114,
          column: 8
        },
        end: {
          line: 116,
          column: 9
        }
      },
      "77": {
        start: {
          line: 115,
          column: 12
        },
        end: {
          line: 115,
          column: 68
        }
      },
      "78": {
        start: {
          line: 117,
          column: 8
        },
        end: {
          line: 119,
          column: 9
        }
      },
      "79": {
        start: {
          line: 118,
          column: 12
        },
        end: {
          line: 118,
          column: 32
        }
      },
      "80": {
        start: {
          line: 120,
          column: 8
        },
        end: {
          line: 120,
          column: 43
        }
      },
      "81": {
        start: {
          line: 121,
          column: 8
        },
        end: {
          line: 121,
          column: 36
        }
      },
      "82": {
        start: {
          line: 123,
          column: 8
        },
        end: {
          line: 132,
          column: 70
        }
      },
      "83": {
        start: {
          line: 128,
          column: 16
        },
        end: {
          line: 128,
          column: 47
        }
      },
      "84": {
        start: {
          line: 131,
          column: 25
        },
        end: {
          line: 131,
          column: 66
        }
      },
      "85": {
        start: {
          line: 132,
          column: 26
        },
        end: {
          line: 132,
          column: 68
        }
      }
    },
    fnMap: {
      "0": {
        name: "(anonymous_0)",
        decl: {
          start: {
            line: 4,
            column: 4
          },
          end: {
            line: 4,
            column: 5
          }
        },
        loc: {
          start: {
            line: 4,
            column: 35
          },
          end: {
            line: 16,
            column: 5
          }
        },
        line: 4
      },
      "1": {
        name: "(anonymous_1)",
        decl: {
          start: {
            line: 17,
            column: 17
          },
          end: {
            line: 17,
            column: 18
          }
        },
        loc: {
          start: {
            line: 17,
            column: 30
          },
          end: {
            line: 19,
            column: 5
          }
        },
        line: 17
      },
      "2": {
        name: "(anonymous_2)",
        decl: {
          start: {
            line: 20,
            column: 13
          },
          end: {
            line: 20,
            column: 14
          }
        },
        loc: {
          start: {
            line: 20,
            column: 22
          },
          end: {
            line: 22,
            column: 5
          }
        },
        line: 20
      },
      "3": {
        name: "(anonymous_3)",
        decl: {
          start: {
            line: 23,
            column: 17
          },
          end: {
            line: 23,
            column: 18
          }
        },
        loc: {
          start: {
            line: 23,
            column: 38
          },
          end: {
            line: 25,
            column: 5
          }
        },
        line: 23
      },
      "4": {
        name: "(anonymous_4)",
        decl: {
          start: {
            line: 26,
            column: 13
          },
          end: {
            line: 26,
            column: 14
          }
        },
        loc: {
          start: {
            line: 26,
            column: 25
          },
          end: {
            line: 43,
            column: 5
          }
        },
        line: 26
      },
      "5": {
        name: "(anonymous_5)",
        decl: {
          start: {
            line: 38,
            column: 52
          },
          end: {
            line: 38,
            column: 53
          }
        },
        loc: {
          start: {
            line: 38,
            column: 66
          },
          end: {
            line: 38,
            column: 97
          }
        },
        line: 38
      },
      "6": {
        name: "(anonymous_6)",
        decl: {
          start: {
            line: 40,
            column: 25
          },
          end: {
            line: 40,
            column: 26
          }
        },
        loc: {
          start: {
            line: 40,
            column: 39
          },
          end: {
            line: 40,
            column: 77
          }
        },
        line: 40
      },
      "7": {
        name: "(anonymous_7)",
        decl: {
          start: {
            line: 44,
            column: 16
          },
          end: {
            line: 44,
            column: 17
          }
        },
        loc: {
          start: {
            line: 44,
            column: 28
          },
          end: {
            line: 49,
            column: 5
          }
        },
        line: 44
      },
      "8": {
        name: "(anonymous_8)",
        decl: {
          start: {
            line: 48,
            column: 46
          },
          end: {
            line: 48,
            column: 47
          }
        },
        loc: {
          start: {
            line: 48,
            column: 63
          },
          end: {
            line: 48,
            column: 90
          }
        },
        line: 48
      },
      "9": {
        name: "(anonymous_9)",
        decl: {
          start: {
            line: 50,
            column: 16
          },
          end: {
            line: 50,
            column: 17
          }
        },
        loc: {
          start: {
            line: 50,
            column: 28
          },
          end: {
            line: 56,
            column: 5
          }
        },
        line: 50
      },
      "10": {
        name: "(anonymous_10)",
        decl: {
          start: {
            line: 55,
            column: 18
          },
          end: {
            line: 55,
            column: 19
          }
        },
        loc: {
          start: {
            line: 55,
            column: 35
          },
          end: {
            line: 55,
            column: 72
          }
        },
        line: 55
      },
      "11": {
        name: "(anonymous_11)",
        decl: {
          start: {
            line: 57,
            column: 17
          },
          end: {
            line: 57,
            column: 18
          }
        },
        loc: {
          start: {
            line: 57,
            column: 29
          },
          end: {
            line: 62,
            column: 5
          }
        },
        line: 57
      },
      "12": {
        name: "(anonymous_12)",
        decl: {
          start: {
            line: 61,
            column: 47
          },
          end: {
            line: 61,
            column: 48
          }
        },
        loc: {
          start: {
            line: 61,
            column: 65
          },
          end: {
            line: 61,
            column: 94
          }
        },
        line: 61
      },
      "13": {
        name: "(anonymous_13)",
        decl: {
          start: {
            line: 63,
            column: 26
          },
          end: {
            line: 63,
            column: 27
          }
        },
        loc: {
          start: {
            line: 63,
            column: 38
          },
          end: {
            line: 66,
            column: 5
          }
        },
        line: 63
      },
      "14": {
        name: "(anonymous_14)",
        decl: {
          start: {
            line: 67,
            column: 30
          },
          end: {
            line: 67,
            column: 31
          }
        },
        loc: {
          start: {
            line: 67,
            column: 52
          },
          end: {
            line: 70,
            column: 5
          }
        },
        line: 67
      },
      "15": {
        name: "(anonymous_15)",
        decl: {
          start: {
            line: 71,
            column: 31
          },
          end: {
            line: 71,
            column: 32
          }
        },
        loc: {
          start: {
            line: 71,
            column: 50
          },
          end: {
            line: 79,
            column: 5
          }
        },
        line: 71
      },
      "16": {
        name: "(anonymous_16)",
        decl: {
          start: {
            line: 80,
            column: 11
          },
          end: {
            line: 80,
            column: 12
          }
        },
        loc: {
          start: {
            line: 80,
            column: 20
          },
          end: {
            line: 83,
            column: 5
          }
        },
        line: 80
      },
      "17": {
        name: "(anonymous_17)",
        decl: {
          start: {
            line: 81,
            column: 13
          },
          end: {
            line: 81,
            column: 14
          }
        },
        loc: {
          start: {
            line: 81,
            column: 30
          },
          end: {
            line: 81,
            column: 75
          }
        },
        line: 81
      },
      "18": {
        name: "(anonymous_18)",
        decl: {
          start: {
            line: 82,
            column: 14
          },
          end: {
            line: 82,
            column: 15
          }
        },
        loc: {
          start: {
            line: 82,
            column: 31
          },
          end: {
            line: 82,
            column: 77
          }
        },
        line: 82
      },
      "19": {
        name: "(anonymous_19)",
        decl: {
          start: {
            line: 84,
            column: 10
          },
          end: {
            line: 84,
            column: 11
          }
        },
        loc: {
          start: {
            line: 84,
            column: 21
          },
          end: {
            line: 84,
            column: 53
          }
        },
        line: 84
      },
      "20": {
        name: "(anonymous_20)",
        decl: {
          start: {
            line: 85,
            column: 11
          },
          end: {
            line: 85,
            column: 12
          }
        },
        loc: {
          start: {
            line: 85,
            column: 22
          },
          end: {
            line: 85,
            column: 55
          }
        },
        line: 85
      },
      "21": {
        name: "(anonymous_21)",
        decl: {
          start: {
            line: 86,
            column: 21
          },
          end: {
            line: 86,
            column: 22
          }
        },
        loc: {
          start: {
            line: 87,
            column: 8
          },
          end: {
            line: 102,
            column: 10
          }
        },
        line: 87
      },
      "22": {
        name: "(anonymous_22)",
        decl: {
          start: {
            line: 87,
            column: 57
          },
          end: {
            line: 87,
            column: 58
          }
        },
        loc: {
          start: {
            line: 87,
            column: 71
          },
          end: {
            line: 102,
            column: 9
          }
        },
        line: 87
      },
      "23": {
        name: "(anonymous_23)",
        decl: {
          start: {
            line: 94,
            column: 43
          },
          end: {
            line: 94,
            column: 44
          }
        },
        loc: {
          start: {
            line: 94,
            column: 49
          },
          end: {
            line: 96,
            column: 17
          }
        },
        line: 94
      },
      "24": {
        name: "(anonymous_24)",
        decl: {
          start: {
            line: 103,
            column: 18
          },
          end: {
            line: 103,
            column: 19
          }
        },
        loc: {
          start: {
            line: 103,
            column: 54
          },
          end: {
            line: 133,
            column: 5
          }
        },
        line: 103
      },
      "25": {
        name: "(anonymous_25)",
        decl: {
          start: {
            line: 127,
            column: 47
          },
          end: {
            line: 127,
            column: 48
          }
        },
        loc: {
          start: {
            line: 127,
            column: 54
          },
          end: {
            line: 129,
            column: 13
          }
        },
        line: 127
      },
      "26": {
        name: "(anonymous_26)",
        decl: {
          start: {
            line: 131,
            column: 18
          },
          end: {
            line: 131,
            column: 19
          }
        },
        loc: {
          start: {
            line: 131,
            column: 25
          },
          end: {
            line: 131,
            column: 66
          }
        },
        line: 131
      },
      "27": {
        name: "(anonymous_27)",
        decl: {
          start: {
            line: 132,
            column: 19
          },
          end: {
            line: 132,
            column: 20
          }
        },
        loc: {
          start: {
            line: 132,
            column: 26
          },
          end: {
            line: 132,
            column: 68
          }
        },
        line: 132
      }
    },
    branchMap: {
      "0": {
        loc: {
          start: {
            line: 4,
            column: 21
          },
          end: {
            line: 4,
            column: 33
          }
        },
        type: "default-arg",
        locations: [{
          start: {
            line: 4,
            column: 31
          },
          end: {
            line: 4,
            column: 33
          }
        }],
        line: 4
      },
      "1": {
        loc: {
          start: {
            line: 27,
            column: 8
          },
          end: {
            line: 41,
            column: 9
          }
        },
        type: "if",
        locations: [{
          start: {
            line: 27,
            column: 8
          },
          end: {
            line: 41,
            column: 9
          }
        }, {
          start: {
            line: 27,
            column: 8
          },
          end: {
            line: 41,
            column: 9
          }
        }],
        line: 27
      },
      "2": {
        loc: {
          start: {
            line: 31,
            column: 12
          },
          end: {
            line: 33,
            column: 13
          }
        },
        type: "if",
        locations: [{
          start: {
            line: 31,
            column: 12
          },
          end: {
            line: 33,
            column: 13
          }
        }, {
          start: {
            line: 31,
            column: 12
          },
          end: {
            line: 33,
            column: 13
          }
        }],
        line: 31
      },
      "3": {
        loc: {
          start: {
            line: 34,
            column: 12
          },
          end: {
            line: 36,
            column: 13
          }
        },
        type: "if",
        locations: [{
          start: {
            line: 34,
            column: 12
          },
          end: {
            line: 36,
            column: 13
          }
        }, {
          start: {
            line: 34,
            column: 12
          },
          end: {
            line: 36,
            column: 13
          }
        }],
        line: 34
      },
      "4": {
        loc: {
          start: {
            line: 45,
            column: 8
          },
          end: {
            line: 47,
            column: 9
          }
        },
        type: "if",
        locations: [{
          start: {
            line: 45,
            column: 8
          },
          end: {
            line: 47,
            column: 9
          }
        }, {
          start: {
            line: 45,
            column: 8
          },
          end: {
            line: 47,
            column: 9
          }
        }],
        line: 45
      },
      "5": {
        loc: {
          start: {
            line: 51,
            column: 8
          },
          end: {
            line: 53,
            column: 9
          }
        },
        type: "if",
        locations: [{
          start: {
            line: 51,
            column: 8
          },
          end: {
            line: 53,
            column: 9
          }
        }, {
          start: {
            line: 51,
            column: 8
          },
          end: {
            line: 53,
            column: 9
          }
        }],
        line: 51
      },
      "6": {
        loc: {
          start: {
            line: 58,
            column: 8
          },
          end: {
            line: 60,
            column: 9
          }
        },
        type: "if",
        locations: [{
          start: {
            line: 58,
            column: 8
          },
          end: {
            line: 60,
            column: 9
          }
        }, {
          start: {
            line: 58,
            column: 8
          },
          end: {
            line: 60,
            column: 9
          }
        }],
        line: 58
      },
      "7": {
        loc: {
          start: {
            line: 74,
            column: 8
          },
          end: {
            line: 78,
            column: 9
          }
        },
        type: "if",
        locations: [{
          start: {
            line: 74,
            column: 8
          },
          end: {
            line: 78,
            column: 9
          }
        }, {
          start: {
            line: 74,
            column: 8
          },
          end: {
            line: 78,
            column: 9
          }
        }],
        line: 74
      },
      "8": {
        loc: {
          start: {
            line: 90,
            column: 12
          },
          end: {
            line: 92,
            column: 13
          }
        },
        type: "if",
        locations: [{
          start: {
            line: 90,
            column: 12
          },
          end: {
            line: 92,
            column: 13
          }
        }, {
          start: {
            line: 90,
            column: 12
          },
          end: {
            line: 92,
            column: 13
          }
        }],
        line: 90
      },
      "9": {
        loc: {
          start: {
            line: 93,
            column: 12
          },
          end: {
            line: 100,
            column: 13
          }
        },
        type: "if",
        locations: [{
          start: {
            line: 93,
            column: 12
          },
          end: {
            line: 100,
            column: 13
          }
        }, {
          start: {
            line: 93,
            column: 12
          },
          end: {
            line: 100,
            column: 13
          }
        }],
        line: 93
      },
      "10": {
        loc: {
          start: {
            line: 93,
            column: 16
          },
          end: {
            line: 93,
            column: 49
          }
        },
        type: "binary-expr",
        locations: [{
          start: {
            line: 93,
            column: 16
          },
          end: {
            line: 93,
            column: 20
          }
        }, {
          start: {
            line: 93,
            column: 24
          },
          end: {
            line: 93,
            column: 49
          }
        }],
        line: 93
      },
      "11": {
        loc: {
          start: {
            line: 103,
            column: 27
          },
          end: {
            line: 103,
            column: 39
          }
        },
        type: "default-arg",
        locations: [{
          start: {
            line: 103,
            column: 37
          },
          end: {
            line: 103,
            column: 39
          }
        }],
        line: 103
      },
      "12": {
        loc: {
          start: {
            line: 107,
            column: 12
          },
          end: {
            line: 107,
            column: 32
          }
        },
        type: "default-arg",
        locations: [{
          start: {
            line: 107,
            column: 28
          },
          end: {
            line: 107,
            column: 32
          }
        }],
        line: 107
      },
      "13": {
        loc: {
          start: {
            line: 111,
            column: 25
          },
          end: {
            line: 112,
            column: 84
          }
        },
        type: "cond-expr",
        locations: [{
          start: {
            line: 112,
            column: 63
          },
          end: {
            line: 112,
            column: 76
          }
        }, {
          start: {
            line: 112,
            column: 79
          },
          end: {
            line: 112,
            column: 84
          }
        }],
        line: 111
      },
      "14": {
        loc: {
          start: {
            line: 111,
            column: 25
          },
          end: {
            line: 112,
            column: 60
          }
        },
        type: "binary-expr",
        locations: [{
          start: {
            line: 111,
            column: 25
          },
          end: {
            line: 111,
            column: 38
          }
        }, {
          start: {
            line: 112,
            column: 13
          },
          end: {
            line: 112,
            column: 60
          }
        }],
        line: 111
      },
      "15": {
        loc: {
          start: {
            line: 114,
            column: 8
          },
          end: {
            line: 116,
            column: 9
          }
        },
        type: "if",
        locations: [{
          start: {
            line: 114,
            column: 8
          },
          end: {
            line: 116,
            column: 9
          }
        }, {
          start: {
            line: 114,
            column: 8
          },
          end: {
            line: 116,
            column: 9
          }
        }],
        line: 114
      },
      "16": {
        loc: {
          start: {
            line: 114,
            column: 12
          },
          end: {
            line: 114,
            column: 59
          }
        },
        type: "binary-expr",
        locations: [{
          start: {
            line: 114,
            column: 12
          },
          end: {
            line: 114,
            column: 20
          }
        }, {
          start: {
            line: 114,
            column: 24
          },
          end: {
            line: 114,
            column: 33
          }
        }, {
          start: {
            line: 114,
            column: 37
          },
          end: {
            line: 114,
            column: 59
          }
        }],
        line: 114
      },
      "17": {
        loc: {
          start: {
            line: 117,
            column: 8
          },
          end: {
            line: 119,
            column: 9
          }
        },
        type: "if",
        locations: [{
          start: {
            line: 117,
            column: 8
          },
          end: {
            line: 119,
            column: 9
          }
        }, {
          start: {
            line: 117,
            column: 8
          },
          end: {
            line: 119,
            column: 9
          }
        }],
        line: 117
      }
    },
    s: {
      "0": 0,
      "1": 0,
      "2": 0,
      "3": 0,
      "4": 0,
      "5": 0,
      "6": 0,
      "7": 0,
      "8": 0,
      "9": 0,
      "10": 0,
      "11": 0,
      "12": 0,
      "13": 0,
      "14": 0,
      "15": 0,
      "16": 0,
      "17": 0,
      "18": 0,
      "19": 0,
      "20": 0,
      "21": 0,
      "22": 0,
      "23": 0,
      "24": 0,
      "25": 0,
      "26": 0,
      "27": 0,
      "28": 0,
      "29": 0,
      "30": 0,
      "31": 0,
      "32": 0,
      "33": 0,
      "34": 0,
      "35": 0,
      "36": 0,
      "37": 0,
      "38": 0,
      "39": 0,
      "40": 0,
      "41": 0,
      "42": 0,
      "43": 0,
      "44": 0,
      "45": 0,
      "46": 0,
      "47": 0,
      "48": 0,
      "49": 0,
      "50": 0,
      "51": 0,
      "52": 0,
      "53": 0,
      "54": 0,
      "55": 0,
      "56": 0,
      "57": 0,
      "58": 0,
      "59": 0,
      "60": 0,
      "61": 0,
      "62": 0,
      "63": 0,
      "64": 0,
      "65": 0,
      "66": 0,
      "67": 0,
      "68": 0,
      "69": 0,
      "70": 0,
      "71": 0,
      "72": 0,
      "73": 0,
      "74": 0,
      "75": 0,
      "76": 0,
      "77": 0,
      "78": 0,
      "79": 0,
      "80": 0,
      "81": 0,
      "82": 0,
      "83": 0,
      "84": 0,
      "85": 0
    },
    f: {
      "0": 0,
      "1": 0,
      "2": 0,
      "3": 0,
      "4": 0,
      "5": 0,
      "6": 0,
      "7": 0,
      "8": 0,
      "9": 0,
      "10": 0,
      "11": 0,
      "12": 0,
      "13": 0,
      "14": 0,
      "15": 0,
      "16": 0,
      "17": 0,
      "18": 0,
      "19": 0,
      "20": 0,
      "21": 0,
      "22": 0,
      "23": 0,
      "24": 0,
      "25": 0,
      "26": 0,
      "27": 0
    },
    b: {
      "0": [0],
      "1": [0, 0],
      "2": [0, 0],
      "3": [0, 0],
      "4": [0, 0],
      "5": [0, 0],
      "6": [0, 0],
      "7": [0, 0],
      "8": [0, 0],
      "9": [0, 0],
      "10": [0, 0],
      "11": [0],
      "12": [0],
      "13": [0, 0],
      "14": [0, 0],
      "15": [0, 0],
      "16": [0, 0, 0],
      "17": [0, 0]
    },
    _coverageSchema: "1a1c01bbd47fc00a2c39e90264f33305004495a9",
    hash: "4d2b2589e1e58fd019bb4eb5c1fda8f31c35c78d"
  };
  var coverage = global[gcv] || (global[gcv] = {});

  if (!coverage[path] || coverage[path].hash !== hash) {
    coverage[path] = coverageData;
  }

  var actualCoverage = coverage[path];
  {
    // @ts-ignore
    cov_2phzhz2hb2 = function () {
      return actualCoverage;
    };
  }
  return actualCoverage;
}

cov_2phzhz2hb2();

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



var Request = function Request(_url) {
  var _this = this;

  var _options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : (cov_2phzhz2hb2().b[0][0]++, {});

  _classCallCheck(this, Request);

  _defineProperty(this, "setOptions", (cov_2phzhz2hb2().s[8]++, function (options) {
    cov_2phzhz2hb2().f[1]++;
    cov_2phzhz2hb2().s[9]++;
    _this.option = Object.assign(_this.options, options);
  }));

  _defineProperty(this, "setUrl", (cov_2phzhz2hb2().s[10]++, function (url) {
    cov_2phzhz2hb2().f[2]++;
    cov_2phzhz2hb2().s[11]++;
    _this.url = url;
  }));

  _defineProperty(this, "setTimeout", (cov_2phzhz2hb2().s[12]++, function (timeout, method) {
    cov_2phzhz2hb2().f[3]++;
    cov_2phzhz2hb2().s[13]++;
    _this.timeouts[method] = timeout;
  }));

  _defineProperty(this, "cancel", (cov_2phzhz2hb2().s[14]++, function (method) {
    cov_2phzhz2hb2().f[4]++;
    cov_2phzhz2hb2().s[15]++;

    if (method) {
      cov_2phzhz2hb2().b[1][0]++;
      var cancel = (cov_2phzhz2hb2().s[16]++, _this.cancelMethods[method]);
      var timeout = (cov_2phzhz2hb2().s[17]++, _this.timeouts[method]);
      cov_2phzhz2hb2().s[18]++;

      if (typeof cancel === 'function') {
        cov_2phzhz2hb2().b[2][0]++;
        cov_2phzhz2hb2().s[19]++;
        cancel();
      } else {
        cov_2phzhz2hb2().b[2][1]++;
      }

      cov_2phzhz2hb2().s[20]++;

      if (timeout) {
        cov_2phzhz2hb2().b[3][0]++;
        cov_2phzhz2hb2().s[21]++;
        clearTimeout(timeout);
      } else {
        cov_2phzhz2hb2().b[3][1]++;
      }
    } else {
      cov_2phzhz2hb2().b[1][1]++;
      cov_2phzhz2hb2().s[22]++;
      Object.keys(_this.cancelMethods).forEach(function (reqMethod) {
        cov_2phzhz2hb2().f[5]++;
        cov_2phzhz2hb2().s[23]++;
        return _this.cancelMethods[reqMethod]();
      });
      cov_2phzhz2hb2().s[24]++;
      Object.keys(_this.timeouts).forEach(function (reqMethod) {
        cov_2phzhz2hb2().f[6]++;
        cov_2phzhz2hb2().s[25]++;
        return clearTimeout(_this.timeouts[reqMethod]);
      });
    }

    cov_2phzhz2hb2().s[26]++;
    return _this;
  }));

  _defineProperty(this, "isPending", (cov_2phzhz2hb2().s[27]++, function (method) {
    cov_2phzhz2hb2().f[7]++;
    cov_2phzhz2hb2().s[28]++;

    if (method) {
      cov_2phzhz2hb2().b[4][0]++;
      cov_2phzhz2hb2().s[29]++;
      return !!_this.pending[method];
    } else {
      cov_2phzhz2hb2().b[4][1]++;
    }

    cov_2phzhz2hb2().s[30]++;
    return Object.keys(_this.pending).some(function (pendingMethod) {
      cov_2phzhz2hb2().f[8]++;
      cov_2phzhz2hb2().s[31]++;
      return _this.pending[pendingMethod];
    });
  }));

  _defineProperty(this, "isPolling", (cov_2phzhz2hb2().s[32]++, function (method) {
    cov_2phzhz2hb2().f[9]++;
    cov_2phzhz2hb2().s[33]++;

    if (method) {
      cov_2phzhz2hb2().b[5][0]++;
      cov_2phzhz2hb2().s[34]++;
      return !!_this.pollingInProgress[method];
    } else {
      cov_2phzhz2hb2().b[5][1]++;
    }

    cov_2phzhz2hb2().s[35]++;
    return Object.keys(_this.pollingInProgress).some(function (pollingMethod) {
      cov_2phzhz2hb2().f[10]++;
      cov_2phzhz2hb2().s[36]++;
      return _this.pollingInProgress[pollingMethod];
    });
  }));

  _defineProperty(this, "isUpdating", (cov_2phzhz2hb2().s[37]++, function (method) {
    cov_2phzhz2hb2().f[11]++;
    cov_2phzhz2hb2().s[38]++;

    if (method) {
      cov_2phzhz2hb2().b[6][0]++;
      cov_2phzhz2hb2().s[39]++;
      return !!_this.updating[method];
    } else {
      cov_2phzhz2hb2().b[6][1]++;
    }

    cov_2phzhz2hb2().s[40]++;
    return Object.keys(_this.updating).some(function (updatingMethod) {
      cov_2phzhz2hb2().f[12]++;
      cov_2phzhz2hb2().s[41]++;
      return _this.updating[updatingMethod];
    });
  }));

  _defineProperty(this, "setOffPendingStatus", (cov_2phzhz2hb2().s[42]++, function (method) {
    cov_2phzhz2hb2().f[13]++;
    cov_2phzhz2hb2().s[43]++;
    _this.pending[method] = false;
    cov_2phzhz2hb2().s[44]++;
    _this.updating[method] = false;
  }));

  _defineProperty(this, "setOffPendingStatusThen", (cov_2phzhz2hb2().s[45]++, function (response, method) {
    cov_2phzhz2hb2().f[14]++;
    cov_2phzhz2hb2().s[46]++;

    _this.setOffPendingStatus(method);

    cov_2phzhz2hb2().s[47]++;
    return response;
  }));

  _defineProperty(this, "setOffPendingStatusCatch", (cov_2phzhz2hb2().s[48]++, function (error, method) {
    cov_2phzhz2hb2().f[15]++;
    cov_2phzhz2hb2().s[49]++;

    _this.setOffPendingStatus(method);

    cov_2phzhz2hb2().s[50]++;
    _this.pollingInProgress[method] = false;
    cov_2phzhz2hb2().s[51]++;

    if (_this.options.errorHandler) {
      cov_2phzhz2hb2().b[7][0]++;
      cov_2phzhz2hb2().s[52]++;

      _this.options.errorHandler(error, method);
    } else {
      cov_2phzhz2hb2().b[7][1]++;
      cov_2phzhz2hb2().s[53]++;
      throw error;
    }
  }));

  _defineProperty(this, "poll", (cov_2phzhz2hb2().s[54]++, function (time) {
    cov_2phzhz2hb2().f[16]++;
    cov_2phzhz2hb2().s[55]++;
    return {
      get: function get(cl, options) {
        cov_2phzhz2hb2().f[17]++;
        cov_2phzhz2hb2().s[56]++;
        return _this.pollingRequest(cl, options, time, 'get');
      },
      post: function post(cl, options) {
        cov_2phzhz2hb2().f[18]++;
        cov_2phzhz2hb2().s[57]++;
        return _this.pollingRequest(cl, options, time, 'post');
      }
    };
  }));

  _defineProperty(this, "get", (cov_2phzhz2hb2().s[58]++, function (options) {
    cov_2phzhz2hb2().f[19]++;
    cov_2phzhz2hb2().s[59]++;
    return _this.sendRequest('get', options);
  }));

  _defineProperty(this, "post", (cov_2phzhz2hb2().s[60]++, function (options) {
    cov_2phzhz2hb2().f[20]++;
    cov_2phzhz2hb2().s[61]++;
    return _this.sendRequest('post', options);
  }));

  _defineProperty(this, "pollingRequest", (cov_2phzhz2hb2().s[62]++, function (cl, options, time, method, updating) {
    cov_2phzhz2hb2().f[21]++;
    cov_2phzhz2hb2().s[63]++;
    return _this.sendRequest(method, options, updating).then(function (response) {
      cov_2phzhz2hb2().f[22]++;
      cov_2phzhz2hb2().s[64]++;
      _this.pollingInProgress[method] = true;
      var continuePolling;
      cov_2phzhz2hb2().s[65]++;

      if (cl) {
        cov_2phzhz2hb2().b[8][0]++;
        cov_2phzhz2hb2().s[66]++;
        continuePolling = cl(response);
      } else {
        cov_2phzhz2hb2().b[8][1]++;
      }

      cov_2phzhz2hb2().s[67]++;

      if ((cov_2phzhz2hb2().b[10][0]++, time) && (cov_2phzhz2hb2().b[10][1]++, continuePolling !== false)) {
        cov_2phzhz2hb2().b[9][0]++;
        var timeOut = (cov_2phzhz2hb2().s[68]++, setTimeout(function () {
          cov_2phzhz2hb2().f[23]++;
          cov_2phzhz2hb2().s[69]++;

          _this.pollingRequest(cl, options, time, method, true);
        }, time));
        cov_2phzhz2hb2().s[70]++;

        _this.setTimeout(timeOut, method);
      } else {
        cov_2phzhz2hb2().b[9][1]++;
        cov_2phzhz2hb2().s[71]++;
        _this.pollingInProgress[method] = false;
      }

      cov_2phzhz2hb2().s[72]++;
      return response;
    });
  }));

  _defineProperty(this, "sendRequest", (cov_2phzhz2hb2().s[73]++, function (method) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : (cov_2phzhz2hb2().b[11][0]++, {});
    var updating = arguments.length > 2 ? arguments[2] : undefined;
    cov_2phzhz2hb2().f[24]++;

    var _ref = (cov_2phzhz2hb2().s[74]++, Object.assign({}, _this.options, options)),
        lockable = _ref.lockable,
        cancelable = _ref.cancelable,
        _ref$axiosInstance = _ref.axiosInstance,
        axiosInstance = _ref$axiosInstance === void 0 ? (cov_2phzhz2hb2().b[12][0]++, null) : _ref$axiosInstance,
        axiosOption = _objectWithoutProperties(_ref, ["lockable", "cancelable", "axiosInstance"]);

    var instance = (cov_2phzhz2hb2().s[75]++, (cov_2phzhz2hb2().b[14][0]++, axiosInstance) && (cov_2phzhz2hb2().b[14][1]++, axiosInstance.constructor === (axios__WEBPACK_IMPORTED_MODULE_0___default().constructor)) ? (cov_2phzhz2hb2().b[13][0]++, axiosInstance) : (cov_2phzhz2hb2().b[13][1]++, (axios__WEBPACK_IMPORTED_MODULE_0___default())));
    cov_2phzhz2hb2().s[76]++;

    if ((cov_2phzhz2hb2().b[16][0]++, lockable) && (cov_2phzhz2hb2().b[16][1]++, !updating) && (cov_2phzhz2hb2().b[16][2]++, _this.isPending(method))) {
      cov_2phzhz2hb2().b[15][0]++;
      cov_2phzhz2hb2().s[77]++;
      return Promise.reject(new Error('Request in progress'));
    } else {
      cov_2phzhz2hb2().b[15][1]++;
    }

    cov_2phzhz2hb2().s[78]++;

    if (cancelable) {
      cov_2phzhz2hb2().b[17][0]++;
      cov_2phzhz2hb2().s[79]++;

      _this.cancel(method);
    } else {
      cov_2phzhz2hb2().b[17][1]++;
    }

    cov_2phzhz2hb2().s[80]++;
    _this.updating[method] = !!updating;
    cov_2phzhz2hb2().s[81]++;
    _this.pending[method] = true;
    cov_2phzhz2hb2().s[82]++;
    return instance(_objectSpread(_objectSpread({}, axiosOption), {}, {
      method: method,
      url: _this.url,
      cancelToken: new (axios__WEBPACK_IMPORTED_MODULE_0___default().CancelToken)(function (c) {
        cov_2phzhz2hb2().f[25]++;
        cov_2phzhz2hb2().s[83]++;
        _this.cancelMethods[method] = c;
      })
    })).then(function (res) {
      cov_2phzhz2hb2().f[26]++;
      cov_2phzhz2hb2().s[84]++;
      return _this.setOffPendingStatusThen(res, method);
    })["catch"](function (err) {
      cov_2phzhz2hb2().f[27]++;
      cov_2phzhz2hb2().s[85]++;
      return _this.setOffPendingStatusCatch(err, method);
    });
  }));

  cov_2phzhz2hb2().f[0]++;
  cov_2phzhz2hb2().s[0]++;
  this.timeouts = {};
  cov_2phzhz2hb2().s[1]++;
  this.cancelMethods = {};
  cov_2phzhz2hb2().s[2]++;
  this.pending = {};
  cov_2phzhz2hb2().s[3]++;
  this.updating = {};
  cov_2phzhz2hb2().s[4]++;
  this.pollingInProgress = {};
  cov_2phzhz2hb2().s[5]++;
  this.options = {
    lockable: false,
    cancelable: true
  };
  cov_2phzhz2hb2().s[6]++;
  this.setOptions(_options);
  cov_2phzhz2hb2().s[7]++;
  this.setUrl(_url);
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Request);

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => module['default'] :
/******/ 				() => module;
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop)
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	// module exports must be returned from runtime so entry inlining is disabled
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__("./axios-request.js");
/******/ })()
;
});
//# sourceMappingURL=axios-request.js.map