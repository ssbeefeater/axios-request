import Request from '../src/axios-request';
import { URL } from 'url';
import axios from 'axios'
import nock from 'nock';

const testMethods = (method) => {
    const mockDomain = 'http://axiosrequest.com'
    describe(method, () => {
        beforeEach(() => {
            nock(mockDomain)
            [method]('/')
                .times(100)
                .reply(200);
            nock(mockDomain)
            [method]('/delay')
                .times(100)
                .delay(100)
                .reply(200);
            nock(mockDomain)
            [method]('/')
                .times(100)
                .query({ foo: 'bar' })
                .reply((uri) => {
                    const parsed = new URL(uri, mockDomain)
                    const response = {}

                    if (parsed.searchParams) {
                        response.query = Object.fromEntries(parsed.searchParams)
                    }

                    return [200, response]
                });
            nock(mockDomain)
            [method]('/delay')
                .times(100)
                .delay(100)
                .query({ foo: 'bar' })
                .reply((uri) => {
                    const parsed = new URL(uri, mockDomain)
                    const response = {}

                    if (parsed.searchParams) {
                        response.query = Object.fromEntries(parsed.searchParams)
                    }

                    return [200, response]
                });
        });
        afterEach(() => {
            nock.cleanAll();
        });
        it('should send request', () => {
            const req = new Request(mockDomain)
            return req[method]()
                .then((res) => {
                    expect(res).to.include({ status: 200 });
                });
        });
        it('should handle the errors', (done) => {
            const errorHandler = sinon.spy();
            const catchError = sinon.spy();
            const req = new Request('http://axiosrequest.com/delay', {
                errorHandler,
            });
            req[method]().catch(catchError);
            req.cancel();
            setTimeout(() => {
                expect(catchError.notCalled).to.be.true;
                expect(errorHandler.calledOnce).to.be.true;
                req.cancel();
                done();
            }, 300);
        });
        describe('custom axios instance', () => {
            it('should send request', () => {
                const axiosInstance = axios.create({
                    params: { foo: 'bar' }
                })

                const req = new Request(mockDomain, {
                    axiosInstance
                })
                return req[method]()
                    .then((res) => {
                        expect(res).to.deep.include({ status: 200, data: { query: { foo: 'bar' } } });
                    });
            });
            it('should handle the errors', (done) => {
                const axiosInstance = axios.create({
                    params: { foo: 'bar' }
                })

                const errorHandler = sinon.spy();
                const catchError = sinon.spy();
                const req = new Request(`${mockDomain}/delay`, {
                    errorHandler,
                    axiosInstance
                });

                req[method]().catch(catchError);
                req.cancel();
                setTimeout(() => {
                    expect(catchError.notCalled).to.be.true;
                    expect(errorHandler.calledOnce).to.be.true;
                    req.cancel();
                    done();
                }, 300);
            });
        })
        describe('isPending', () => {
            it('isPending value should be right', (done) => {
                const req = new Request(`${mockDomain}/delay`)
                req[method]()
                    .then((res) => {
                        expect(req.isPending()).to.be.false;
                        done();
                    });
                expect(req.isPending()).to.be.true;
            });
            it('isPending with should be right', (done) => {
                const req = new Request(`${mockDomain}/delay`)
                req[method]()
                    .then((res) => {
                        expect(req.isPending(method)).to.be.false;
                        done();
                    });
                expect(req.isPending(method)).to.be.true;
            });
        })
        it('should cancel previous request', (done) => {
            const req = new Request(`${mockDomain}/delay`);
            req[method]()
                .catch((error) => {
                    expect(error.constructor.name).to.be.equal('Cancel');
                    done();
                });
            req[method]()
        })
        it('should not cancel previous reuqest if cancelable:false', (done) => {
            const req = new Request('http://axiosrequest.com/delay', {
                cancelable: false,
            });
            const cl = sinon.spy();
            req[method]().then(res => {
                expect(res).to.include({ status: 200 });
            }).catch(cl);
            req[method]().then(res => {
                expect(res).to.include({ status: 200 });
                expect(cl.notCalled).to.be.true;
                done();
            })
        })
        it('should not send request if is pending', (done) => {
            const req = new Request('http://axiosrequest.com', {
                lockable: true,
            });
            req[method]()
            req[method]().catch((error) => {
                expect(error.message).to.be.equal('Request in progress');
                done();
            });
        })
        describe('polling', () => {
            describe('isPolling', () => {
                it('should return true if polling', () => {
                    const req = new Request(mockDomain);
                    return req.poll(1000)[method]().then(() => {
                        expect(req.isPolling()).to.be.true;
                        req.cancel();
                    });
                });
                it('should return true if polling with method', () => {
                    const req = new Request(mockDomain);
                    return req.poll(1000)[method]().then(() => {
                        expect(req.isPolling(method)).to.be.true;
                        req.cancel();
                    });
                });
                it('should return false if not polling', () => {
                    const req = new Request(mockDomain);
                    return req[method]().then(() => {
                        expect(req.isPolling()).to.be.false;
                    });
                });
                it('should return false if polling is canceled', (done) => {
                    const req = new Request(mockDomain);
                    const spy = sinon.spy();

                    req.poll(100)[method](spy).catch(() => {
                        expect(spy.notCalled).to.equal(true);
                        expect(req.isPolling()).to.be.false;
                    });
                    req.cancel();
                    setTimeout(() => {
                        expect(spy.notCalled).to.equal(true);
                        done();
                    }, 300);
                });
            })
            describe('isUpdating', () => {
                it('should return true if updating', (done) => {
                    const req = new Request(`${mockDomain}/delay`);
                    req.poll(100)[method]();
                    setTimeout(() => {
                        expect(req.isUpdating()).to.be.true;
                        req.cancel();
                        done();
                    }, 250);
                });
                it('should return true if updating with method', (done) => {
                    const req = new Request(`${mockDomain}/delay`);
                    req.poll(100)[method]();
                    setTimeout(() => {
                        expect(req.isUpdating(method)).to.be.true;
                        req.cancel();
                        done();
                    }, 250);
                });
                it('should return false if not updating', () => {
                    const req = new Request(mockDomain);
                    return req.poll(100)[method]().then(() => {
                        expect(req.isUpdating()).to.be.false;
                        req.cancel();
                    });
                });

                it('should return false if polling is canceled', (done) => {
                    const req = new Request(mockDomain);
                    const spy = sinon.spy();

                    req.poll(100)[method](spy).catch(() => {
                        expect(req.isUpdating()).to.be.false;
                        done();
                    });
                    req.cancel();
                });
            })
            describe('general', () => {
                it('should send 3 requests', (done) => {
                    const req = new Request(mockDomain);
                    const cs = sinon.spy();
                    req.poll(100)[method](cs)
                    setTimeout(() => {
                        expect(cs.callCount).to.be.equal(3);
                        req.cancel();
                        done();
                    }, 300);
                });
                it('should not poll if polling time is 0', (done) => {
                    const req = new Request(mockDomain);
                    const cs = sinon.spy();
                    req.poll(0)[method](cs)
                    setTimeout(() => {
                        expect(cs.callCount).to.be.equal(1);
                        req.cancel();
                        done();
                    }, 300);
                });
                it('should stop polling if return false in cl', (done) => {
                    const req = new Request(mockDomain);
                    let resNumer = 0;
                    const cs = sinon.spy();
                    req.poll(50)[method](res => {
                        cs();
                        resNumer++;
                        if (resNumer === 2) {
                            return false
                        }
                    })
                    setTimeout(() => {
                        expect(cs.callCount).to.be.equal(2);
                        done();
                    }, 300);
                });
            })
        })
    });

}

testMethods('get')
testMethods('post')
