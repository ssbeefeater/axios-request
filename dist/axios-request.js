(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["axios-request"] = factory();
	else
		root["axios-request"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 9);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var bind = __webpack_require__(1);
var isBuffer = __webpack_require__(13);

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
 * Determine if a value is undefined
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if the value is undefined, otherwise false
 */
function isUndefined(val) {
  return typeof val === 'undefined';
}

/**
 * Determine if a value is an Object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Object, otherwise false
 */
function isObject(val) {
  return val !== null && (typeof val === 'undefined' ? 'undefined' : _typeof(val)) === 'object';
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
  }

  // Force an array if not already something iterable
  if ((typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) !== 'object') {
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
function merge() /* obj1, obj2, obj3, ... */{
  var result = {};
  function assignValue(val, key) {
    if (_typeof(result[key]) === 'object' && (typeof val === 'undefined' ? 'undefined' : _typeof(val)) === 'object') {
      result[key] = merge(result[key], val);
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
 * Function equal to merge with the difference being that no reference
 * to original objects is kept.
 *
 * @see merge
 * @param {Object} obj1 Object to merge
 * @returns {Object} Result of all merge properties
 */
function deepMerge() /* obj1, obj2, obj3, ... */{
  var result = {};
  function assignValue(val, key) {
    if (_typeof(result[key]) === 'object' && (typeof val === 'undefined' ? 'undefined' : _typeof(val)) === 'object') {
      result[key] = deepMerge(result[key], val);
    } else if ((typeof val === 'undefined' ? 'undefined' : _typeof(val)) === 'object') {
      result[key] = deepMerge({}, val);
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

module.exports = {
  isArray: isArray,
  isArrayBuffer: isArrayBuffer,
  isBuffer: isBuffer,
  isFormData: isFormData,
  isArrayBufferView: isArrayBufferView,
  isString: isString,
  isNumber: isNumber,
  isObject: isObject,
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
  deepMerge: deepMerge,
  extend: extend,
  trim: trim
};

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

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
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(0);

function encode(val) {
  return encodeURIComponent(val).replace(/%40/gi, '@').replace(/%3A/gi, ':').replace(/%24/g, '$').replace(/%2C/gi, ',').replace(/%20/g, '+').replace(/%5B/gi, '[').replace(/%5D/gi, ']');
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
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function isCancel(value) {
  return !!(value && value.__CANCEL__);
};

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {

var utils = __webpack_require__(0);
var normalizeHeaderName = __webpack_require__(19);

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
  // Only Node.JS has a process variable that is of [[Class]] process
  if (typeof process !== 'undefined' && Object.prototype.toString.call(process) === '[object process]') {
    // For node use HTTP adapter
    adapter = __webpack_require__(5);
  } else if (typeof XMLHttpRequest !== 'undefined') {
    // For browsers use XHR adapter
    adapter = __webpack_require__(5);
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
      } catch (e) {/* Ignore */}
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
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(18)))

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(0);
var settle = __webpack_require__(20);
var buildURL = __webpack_require__(2);
var parseHeaders = __webpack_require__(22);
var isURLSameOrigin = __webpack_require__(23);
var createError = __webpack_require__(6);

module.exports = function xhrAdapter(config) {
  return new Promise(function dispatchXhrRequest(resolve, reject) {
    var requestData = config.data;
    var requestHeaders = config.headers;

    if (utils.isFormData(requestData)) {
      delete requestHeaders['Content-Type']; // Let the browser set it
    }

    var request = new XMLHttpRequest();

    // HTTP basic authentication
    if (config.auth) {
      var username = config.auth.username || '';
      var password = config.auth.password || '';
      requestHeaders.Authorization = 'Basic ' + btoa(username + ':' + password);
    }

    request.open(config.method.toUpperCase(), buildURL(config.url, config.params, config.paramsSerializer), true);

    // Set the request timeout in MS
    request.timeout = config.timeout;

    // Listen for ready state
    request.onreadystatechange = function handleLoad() {
      if (!request || request.readyState !== 4) {
        return;
      }

      // The request errored out and we didn't get a response, this will be
      // handled by onerror instead
      // With one exception: request that using file: protocol, most browsers
      // will return status as 0 even though it's a successful request
      if (request.status === 0 && !(request.responseURL && request.responseURL.indexOf('file:') === 0)) {
        return;
      }

      // Prepare the response
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

      settle(resolve, reject, response);

      // Clean up request
      request = null;
    };

    // Handle browser request cancellation (as opposed to a manual cancellation)
    request.onabort = function handleAbort() {
      if (!request) {
        return;
      }

      reject(createError('Request aborted', config, 'ECONNABORTED', request));

      // Clean up request
      request = null;
    };

    // Handle low level network errors
    request.onerror = function handleError() {
      // Real errors are hidden from us by the browser
      // onerror should only fire if it's a network error
      reject(createError('Network Error', config, null, request));

      // Clean up request
      request = null;
    };

    // Handle timeout
    request.ontimeout = function handleTimeout() {
      reject(createError('timeout of ' + config.timeout + 'ms exceeded', config, 'ECONNABORTED', request));

      // Clean up request
      request = null;
    };

    // Add xsrf header
    // This is only done if running in a standard browser environment.
    // Specifically not if we're in a web worker, or react-native.
    if (utils.isStandardBrowserEnv()) {
      var cookies = __webpack_require__(24);

      // Add xsrf header
      var xsrfValue = (config.withCredentials || isURLSameOrigin(config.url)) && config.xsrfCookieName ? cookies.read(config.xsrfCookieName) : undefined;

      if (xsrfValue) {
        requestHeaders[config.xsrfHeaderName] = xsrfValue;
      }
    }

    // Add headers to the request
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
    }

    // Add withCredentials to request if needed
    if (config.withCredentials) {
      request.withCredentials = true;
    }

    // Add responseType to request if needed
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
    }

    // Handle progress if needed
    if (typeof config.onDownloadProgress === 'function') {
      request.addEventListener('progress', config.onDownloadProgress);
    }

    // Not all browsers support upload events
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
        reject(cancel);
        // Clean up request
        request = null;
      });
    }

    if (requestData === undefined) {
      requestData = null;
    }

    // Send the request
    request.send(requestData);
  });
};

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var enhanceError = __webpack_require__(21);

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
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(0);

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

  utils.forEach(['url', 'method', 'params', 'data'], function valueFromConfig2(prop) {
    if (typeof config2[prop] !== 'undefined') {
      config[prop] = config2[prop];
    }
  });

  utils.forEach(['headers', 'auth', 'proxy'], function mergeDeepProperties(prop) {
    if (utils.isObject(config2[prop])) {
      config[prop] = utils.deepMerge(config1[prop], config2[prop]);
    } else if (typeof config2[prop] !== 'undefined') {
      config[prop] = config2[prop];
    } else if (utils.isObject(config1[prop])) {
      config[prop] = utils.deepMerge(config1[prop]);
    } else if (typeof config1[prop] !== 'undefined') {
      config[prop] = config1[prop];
    }
  });

  utils.forEach(['baseURL', 'transformRequest', 'transformResponse', 'paramsSerializer', 'timeout', 'withCredentials', 'adapter', 'responseType', 'xsrfCookieName', 'xsrfHeaderName', 'onUploadProgress', 'onDownloadProgress', 'maxContentLength', 'validateStatus', 'maxRedirects', 'httpAgent', 'httpsAgent', 'cancelToken', 'socketPath'], function defaultToConfig2(prop) {
    if (typeof config2[prop] !== 'undefined') {
      config[prop] = config2[prop];
    } else if (typeof config1[prop] !== 'undefined') {
      config[prop] = config1[prop];
    }
  });

  return config;
};

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

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
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(10);


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var cov_15j8tpybze = function () {
    var path = '/home/mike/projects/axios-request/src/axios-request.js',
        hash = '59a64c6be56ac2c7f8f8ad25e520b8b4e5bc6060',
        global = new Function('return this')(),
        gcv = '__coverage__',
        coverageData = {
        path: '/home/mike/projects/axios-request/src/axios-request.js',
        statementMap: {
            '0': {
                start: {
                    line: 5,
                    column: 8
                },
                end: {
                    line: 5,
                    column: 27
                }
            },
            '1': {
                start: {
                    line: 6,
                    column: 8
                },
                end: {
                    line: 6,
                    column: 32
                }
            },
            '2': {
                start: {
                    line: 7,
                    column: 8
                },
                end: {
                    line: 7,
                    column: 26
                }
            },
            '3': {
                start: {
                    line: 8,
                    column: 8
                },
                end: {
                    line: 8,
                    column: 27
                }
            },
            '4': {
                start: {
                    line: 9,
                    column: 8
                },
                end: {
                    line: 9,
                    column: 36
                }
            },
            '5': {
                start: {
                    line: 10,
                    column: 8
                },
                end: {
                    line: 13,
                    column: 10
                }
            },
            '6': {
                start: {
                    line: 14,
                    column: 8
                },
                end: {
                    line: 14,
                    column: 33
                }
            },
            '7': {
                start: {
                    line: 15,
                    column: 8
                },
                end: {
                    line: 15,
                    column: 25
                }
            },
            '8': {
                start: {
                    line: 18,
                    column: 8
                },
                end: {
                    line: 18,
                    column: 59
                }
            },
            '9': {
                start: {
                    line: 21,
                    column: 8
                },
                end: {
                    line: 21,
                    column: 23
                }
            },
            '10': {
                start: {
                    line: 24,
                    column: 8
                },
                end: {
                    line: 24,
                    column: 40
                }
            },
            '11': {
                start: {
                    line: 27,
                    column: 8
                },
                end: {
                    line: 40,
                    column: 9
                }
            },
            '12': {
                start: {
                    line: 28,
                    column: 27
                },
                end: {
                    line: 28,
                    column: 53
                }
            },
            '13': {
                start: {
                    line: 29,
                    column: 28
                },
                end: {
                    line: 29,
                    column: 49
                }
            },
            '14': {
                start: {
                    line: 31,
                    column: 12
                },
                end: {
                    line: 33,
                    column: 13
                }
            },
            '15': {
                start: {
                    line: 32,
                    column: 16
                },
                end: {
                    line: 32,
                    column: 25
                }
            },
            '16': {
                start: {
                    line: 34,
                    column: 12
                },
                end: {
                    line: 36,
                    column: 13
                }
            },
            '17': {
                start: {
                    line: 35,
                    column: 16
                },
                end: {
                    line: 35,
                    column: 38
                }
            },
            '18': {
                start: {
                    line: 38,
                    column: 12
                },
                end: {
                    line: 38,
                    column: 100
                }
            },
            '19': {
                start: {
                    line: 38,
                    column: 66
                },
                end: {
                    line: 38,
                    column: 97
                }
            },
            '20': {
                start: {
                    line: 39,
                    column: 12
                },
                end: {
                    line: 39,
                    column: 102
                }
            },
            '21': {
                start: {
                    line: 39,
                    column: 61
                },
                end: {
                    line: 39,
                    column: 99
                }
            },
            '22': {
                start: {
                    line: 41,
                    column: 8
                },
                end: {
                    line: 41,
                    column: 20
                }
            },
            '23': {
                start: {
                    line: 44,
                    column: 8
                },
                end: {
                    line: 46,
                    column: 9
                }
            },
            '24': {
                start: {
                    line: 45,
                    column: 12
                },
                end: {
                    line: 45,
                    column: 42
                }
            },
            '25': {
                start: {
                    line: 47,
                    column: 8
                },
                end: {
                    line: 47,
                    column: 92
                }
            },
            '26': {
                start: {
                    line: 47,
                    column: 63
                },
                end: {
                    line: 47,
                    column: 90
                }
            },
            '27': {
                start: {
                    line: 50,
                    column: 8
                },
                end: {
                    line: 52,
                    column: 9
                }
            },
            '28': {
                start: {
                    line: 51,
                    column: 12
                },
                end: {
                    line: 51,
                    column: 52
                }
            },
            '29': {
                start: {
                    line: 53,
                    column: 8
                },
                end: {
                    line: 53,
                    column: 112
                }
            },
            '30': {
                start: {
                    line: 53,
                    column: 73
                },
                end: {
                    line: 53,
                    column: 110
                }
            },
            '31': {
                start: {
                    line: 56,
                    column: 8
                },
                end: {
                    line: 58,
                    column: 9
                }
            },
            '32': {
                start: {
                    line: 57,
                    column: 12
                },
                end: {
                    line: 57,
                    column: 43
                }
            },
            '33': {
                start: {
                    line: 59,
                    column: 8
                },
                end: {
                    line: 59,
                    column: 96
                }
            },
            '34': {
                start: {
                    line: 59,
                    column: 65
                },
                end: {
                    line: 59,
                    column: 94
                }
            },
            '35': {
                start: {
                    line: 62,
                    column: 8
                },
                end: {
                    line: 62,
                    column: 37
                }
            },
            '36': {
                start: {
                    line: 63,
                    column: 8
                },
                end: {
                    line: 63,
                    column: 38
                }
            },
            '37': {
                start: {
                    line: 66,
                    column: 8
                },
                end: {
                    line: 66,
                    column: 41
                }
            },
            '38': {
                start: {
                    line: 67,
                    column: 8
                },
                end: {
                    line: 67,
                    column: 24
                }
            },
            '39': {
                start: {
                    line: 70,
                    column: 8
                },
                end: {
                    line: 70,
                    column: 41
                }
            },
            '40': {
                start: {
                    line: 71,
                    column: 8
                },
                end: {
                    line: 71,
                    column: 47
                }
            },
            '41': {
                start: {
                    line: 72,
                    column: 8
                },
                end: {
                    line: 76,
                    column: 9
                }
            },
            '42': {
                start: {
                    line: 73,
                    column: 12
                },
                end: {
                    line: 73,
                    column: 53
                }
            },
            '43': {
                start: {
                    line: 75,
                    column: 12
                },
                end: {
                    line: 75,
                    column: 24
                }
            },
            '44': {
                start: {
                    line: 78,
                    column: 20
                },
                end: {
                    line: 81,
                    column: 5
                }
            },
            '45': {
                start: {
                    line: 79,
                    column: 30
                },
                end: {
                    line: 79,
                    column: 75
                }
            },
            '46': {
                start: {
                    line: 80,
                    column: 31
                },
                end: {
                    line: 80,
                    column: 77
                }
            },
            '47': {
                start: {
                    line: 82,
                    column: 21
                },
                end: {
                    line: 82,
                    column: 53
                }
            },
            '48': {
                start: {
                    line: 83,
                    column: 22
                },
                end: {
                    line: 83,
                    column: 55
                }
            },
            '49': {
                start: {
                    line: 85,
                    column: 8
                },
                end: {
                    line: 100,
                    column: 10
                }
            },
            '50': {
                start: {
                    line: 86,
                    column: 12
                },
                end: {
                    line: 86,
                    column: 50
                }
            },
            '51': {
                start: {
                    line: 88,
                    column: 12
                },
                end: {
                    line: 90,
                    column: 13
                }
            },
            '52': {
                start: {
                    line: 89,
                    column: 16
                },
                end: {
                    line: 89,
                    column: 47
                }
            },
            '53': {
                start: {
                    line: 91,
                    column: 12
                },
                end: {
                    line: 98,
                    column: 13
                }
            },
            '54': {
                start: {
                    line: 92,
                    column: 32
                },
                end: {
                    line: 94,
                    column: 24
                }
            },
            '55': {
                start: {
                    line: 93,
                    column: 20
                },
                end: {
                    line: 93,
                    column: 73
                }
            },
            '56': {
                start: {
                    line: 95,
                    column: 16
                },
                end: {
                    line: 95,
                    column: 49
                }
            },
            '57': {
                start: {
                    line: 97,
                    column: 16
                },
                end: {
                    line: 97,
                    column: 55
                }
            },
            '58': {
                start: {
                    line: 99,
                    column: 12
                },
                end: {
                    line: 99,
                    column: 28
                }
            },
            '59': {
                start: {
                    line: 106,
                    column: 12
                },
                end: {
                    line: 106,
                    column: 52
                }
            },
            '60': {
                start: {
                    line: 107,
                    column: 8
                },
                end: {
                    line: 109,
                    column: 9
                }
            },
            '61': {
                start: {
                    line: 108,
                    column: 12
                },
                end: {
                    line: 108,
                    column: 68
                }
            },
            '62': {
                start: {
                    line: 110,
                    column: 8
                },
                end: {
                    line: 112,
                    column: 9
                }
            },
            '63': {
                start: {
                    line: 111,
                    column: 12
                },
                end: {
                    line: 111,
                    column: 32
                }
            },
            '64': {
                start: {
                    line: 113,
                    column: 8
                },
                end: {
                    line: 113,
                    column: 43
                }
            },
            '65': {
                start: {
                    line: 114,
                    column: 8
                },
                end: {
                    line: 114,
                    column: 36
                }
            },
            '66': {
                start: {
                    line: 115,
                    column: 8
                },
                end: {
                    line: 124,
                    column: 70
                }
            },
            '67': {
                start: {
                    line: 120,
                    column: 16
                },
                end: {
                    line: 120,
                    column: 47
                }
            },
            '68': {
                start: {
                    line: 123,
                    column: 25
                },
                end: {
                    line: 123,
                    column: 66
                }
            },
            '69': {
                start: {
                    line: 124,
                    column: 26
                },
                end: {
                    line: 124,
                    column: 68
                }
            }
        },
        fnMap: {
            '0': {
                name: '(anonymous_0)',
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
            '1': {
                name: '(anonymous_1)',
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
            '2': {
                name: '(anonymous_2)',
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
            '3': {
                name: '(anonymous_3)',
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
            '4': {
                name: '(anonymous_4)',
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
                        line: 42,
                        column: 5
                    }
                },
                line: 26
            },
            '5': {
                name: '(anonymous_5)',
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
            '6': {
                name: '(anonymous_6)',
                decl: {
                    start: {
                        line: 39,
                        column: 47
                    },
                    end: {
                        line: 39,
                        column: 48
                    }
                },
                loc: {
                    start: {
                        line: 39,
                        column: 61
                    },
                    end: {
                        line: 39,
                        column: 99
                    }
                },
                line: 39
            },
            '7': {
                name: '(anonymous_7)',
                decl: {
                    start: {
                        line: 43,
                        column: 16
                    },
                    end: {
                        line: 43,
                        column: 17
                    }
                },
                loc: {
                    start: {
                        line: 43,
                        column: 28
                    },
                    end: {
                        line: 48,
                        column: 5
                    }
                },
                line: 43
            },
            '8': {
                name: '(anonymous_8)',
                decl: {
                    start: {
                        line: 47,
                        column: 46
                    },
                    end: {
                        line: 47,
                        column: 47
                    }
                },
                loc: {
                    start: {
                        line: 47,
                        column: 63
                    },
                    end: {
                        line: 47,
                        column: 90
                    }
                },
                line: 47
            },
            '9': {
                name: '(anonymous_9)',
                decl: {
                    start: {
                        line: 49,
                        column: 16
                    },
                    end: {
                        line: 49,
                        column: 17
                    }
                },
                loc: {
                    start: {
                        line: 49,
                        column: 28
                    },
                    end: {
                        line: 54,
                        column: 5
                    }
                },
                line: 49
            },
            '10': {
                name: '(anonymous_10)',
                decl: {
                    start: {
                        line: 53,
                        column: 56
                    },
                    end: {
                        line: 53,
                        column: 57
                    }
                },
                loc: {
                    start: {
                        line: 53,
                        column: 73
                    },
                    end: {
                        line: 53,
                        column: 110
                    }
                },
                line: 53
            },
            '11': {
                name: '(anonymous_11)',
                decl: {
                    start: {
                        line: 55,
                        column: 17
                    },
                    end: {
                        line: 55,
                        column: 18
                    }
                },
                loc: {
                    start: {
                        line: 55,
                        column: 29
                    },
                    end: {
                        line: 60,
                        column: 5
                    }
                },
                line: 55
            },
            '12': {
                name: '(anonymous_12)',
                decl: {
                    start: {
                        line: 59,
                        column: 47
                    },
                    end: {
                        line: 59,
                        column: 48
                    }
                },
                loc: {
                    start: {
                        line: 59,
                        column: 65
                    },
                    end: {
                        line: 59,
                        column: 94
                    }
                },
                line: 59
            },
            '13': {
                name: '(anonymous_13)',
                decl: {
                    start: {
                        line: 61,
                        column: 26
                    },
                    end: {
                        line: 61,
                        column: 27
                    }
                },
                loc: {
                    start: {
                        line: 61,
                        column: 38
                    },
                    end: {
                        line: 64,
                        column: 5
                    }
                },
                line: 61
            },
            '14': {
                name: '(anonymous_14)',
                decl: {
                    start: {
                        line: 65,
                        column: 30
                    },
                    end: {
                        line: 65,
                        column: 31
                    }
                },
                loc: {
                    start: {
                        line: 65,
                        column: 52
                    },
                    end: {
                        line: 68,
                        column: 5
                    }
                },
                line: 65
            },
            '15': {
                name: '(anonymous_15)',
                decl: {
                    start: {
                        line: 69,
                        column: 31
                    },
                    end: {
                        line: 69,
                        column: 32
                    }
                },
                loc: {
                    start: {
                        line: 69,
                        column: 50
                    },
                    end: {
                        line: 77,
                        column: 5
                    }
                },
                line: 69
            },
            '16': {
                name: '(anonymous_16)',
                decl: {
                    start: {
                        line: 78,
                        column: 11
                    },
                    end: {
                        line: 78,
                        column: 12
                    }
                },
                loc: {
                    start: {
                        line: 78,
                        column: 20
                    },
                    end: {
                        line: 81,
                        column: 5
                    }
                },
                line: 78
            },
            '17': {
                name: '(anonymous_17)',
                decl: {
                    start: {
                        line: 79,
                        column: 13
                    },
                    end: {
                        line: 79,
                        column: 14
                    }
                },
                loc: {
                    start: {
                        line: 79,
                        column: 30
                    },
                    end: {
                        line: 79,
                        column: 75
                    }
                },
                line: 79
            },
            '18': {
                name: '(anonymous_18)',
                decl: {
                    start: {
                        line: 80,
                        column: 14
                    },
                    end: {
                        line: 80,
                        column: 15
                    }
                },
                loc: {
                    start: {
                        line: 80,
                        column: 31
                    },
                    end: {
                        line: 80,
                        column: 77
                    }
                },
                line: 80
            },
            '19': {
                name: '(anonymous_19)',
                decl: {
                    start: {
                        line: 82,
                        column: 10
                    },
                    end: {
                        line: 82,
                        column: 11
                    }
                },
                loc: {
                    start: {
                        line: 82,
                        column: 21
                    },
                    end: {
                        line: 82,
                        column: 53
                    }
                },
                line: 82
            },
            '20': {
                name: '(anonymous_20)',
                decl: {
                    start: {
                        line: 83,
                        column: 11
                    },
                    end: {
                        line: 83,
                        column: 12
                    }
                },
                loc: {
                    start: {
                        line: 83,
                        column: 22
                    },
                    end: {
                        line: 83,
                        column: 55
                    }
                },
                line: 83
            },
            '21': {
                name: '(anonymous_21)',
                decl: {
                    start: {
                        line: 84,
                        column: 21
                    },
                    end: {
                        line: 84,
                        column: 22
                    }
                },
                loc: {
                    start: {
                        line: 85,
                        column: 8
                    },
                    end: {
                        line: 100,
                        column: 10
                    }
                },
                line: 85
            },
            '22': {
                name: '(anonymous_22)',
                decl: {
                    start: {
                        line: 85,
                        column: 57
                    },
                    end: {
                        line: 85,
                        column: 58
                    }
                },
                loc: {
                    start: {
                        line: 85,
                        column: 71
                    },
                    end: {
                        line: 100,
                        column: 9
                    }
                },
                line: 85
            },
            '23': {
                name: '(anonymous_23)',
                decl: {
                    start: {
                        line: 92,
                        column: 43
                    },
                    end: {
                        line: 92,
                        column: 44
                    }
                },
                loc: {
                    start: {
                        line: 92,
                        column: 49
                    },
                    end: {
                        line: 94,
                        column: 17
                    }
                },
                line: 92
            },
            '24': {
                name: '(anonymous_24)',
                decl: {
                    start: {
                        line: 101,
                        column: 18
                    },
                    end: {
                        line: 101,
                        column: 19
                    }
                },
                loc: {
                    start: {
                        line: 101,
                        column: 54
                    },
                    end: {
                        line: 125,
                        column: 5
                    }
                },
                line: 101
            },
            '25': {
                name: '(anonymous_25)',
                decl: {
                    start: {
                        line: 119,
                        column: 47
                    },
                    end: {
                        line: 119,
                        column: 48
                    }
                },
                loc: {
                    start: {
                        line: 119,
                        column: 54
                    },
                    end: {
                        line: 121,
                        column: 13
                    }
                },
                line: 119
            },
            '26': {
                name: '(anonymous_26)',
                decl: {
                    start: {
                        line: 123,
                        column: 18
                    },
                    end: {
                        line: 123,
                        column: 19
                    }
                },
                loc: {
                    start: {
                        line: 123,
                        column: 25
                    },
                    end: {
                        line: 123,
                        column: 66
                    }
                },
                line: 123
            },
            '27': {
                name: '(anonymous_27)',
                decl: {
                    start: {
                        line: 124,
                        column: 19
                    },
                    end: {
                        line: 124,
                        column: 20
                    }
                },
                loc: {
                    start: {
                        line: 124,
                        column: 26
                    },
                    end: {
                        line: 124,
                        column: 68
                    }
                },
                line: 124
            }
        },
        branchMap: {
            '0': {
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
                type: 'default-arg',
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
            '1': {
                loc: {
                    start: {
                        line: 27,
                        column: 8
                    },
                    end: {
                        line: 40,
                        column: 9
                    }
                },
                type: 'if',
                locations: [{
                    start: {
                        line: 27,
                        column: 8
                    },
                    end: {
                        line: 40,
                        column: 9
                    }
                }, {
                    start: {
                        line: 27,
                        column: 8
                    },
                    end: {
                        line: 40,
                        column: 9
                    }
                }],
                line: 27
            },
            '2': {
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
                type: 'if',
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
            '3': {
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
                type: 'if',
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
            '4': {
                loc: {
                    start: {
                        line: 44,
                        column: 8
                    },
                    end: {
                        line: 46,
                        column: 9
                    }
                },
                type: 'if',
                locations: [{
                    start: {
                        line: 44,
                        column: 8
                    },
                    end: {
                        line: 46,
                        column: 9
                    }
                }, {
                    start: {
                        line: 44,
                        column: 8
                    },
                    end: {
                        line: 46,
                        column: 9
                    }
                }],
                line: 44
            },
            '5': {
                loc: {
                    start: {
                        line: 50,
                        column: 8
                    },
                    end: {
                        line: 52,
                        column: 9
                    }
                },
                type: 'if',
                locations: [{
                    start: {
                        line: 50,
                        column: 8
                    },
                    end: {
                        line: 52,
                        column: 9
                    }
                }, {
                    start: {
                        line: 50,
                        column: 8
                    },
                    end: {
                        line: 52,
                        column: 9
                    }
                }],
                line: 50
            },
            '6': {
                loc: {
                    start: {
                        line: 56,
                        column: 8
                    },
                    end: {
                        line: 58,
                        column: 9
                    }
                },
                type: 'if',
                locations: [{
                    start: {
                        line: 56,
                        column: 8
                    },
                    end: {
                        line: 58,
                        column: 9
                    }
                }, {
                    start: {
                        line: 56,
                        column: 8
                    },
                    end: {
                        line: 58,
                        column: 9
                    }
                }],
                line: 56
            },
            '7': {
                loc: {
                    start: {
                        line: 72,
                        column: 8
                    },
                    end: {
                        line: 76,
                        column: 9
                    }
                },
                type: 'if',
                locations: [{
                    start: {
                        line: 72,
                        column: 8
                    },
                    end: {
                        line: 76,
                        column: 9
                    }
                }, {
                    start: {
                        line: 72,
                        column: 8
                    },
                    end: {
                        line: 76,
                        column: 9
                    }
                }],
                line: 72
            },
            '8': {
                loc: {
                    start: {
                        line: 88,
                        column: 12
                    },
                    end: {
                        line: 90,
                        column: 13
                    }
                },
                type: 'if',
                locations: [{
                    start: {
                        line: 88,
                        column: 12
                    },
                    end: {
                        line: 90,
                        column: 13
                    }
                }, {
                    start: {
                        line: 88,
                        column: 12
                    },
                    end: {
                        line: 90,
                        column: 13
                    }
                }],
                line: 88
            },
            '9': {
                loc: {
                    start: {
                        line: 91,
                        column: 12
                    },
                    end: {
                        line: 98,
                        column: 13
                    }
                },
                type: 'if',
                locations: [{
                    start: {
                        line: 91,
                        column: 12
                    },
                    end: {
                        line: 98,
                        column: 13
                    }
                }, {
                    start: {
                        line: 91,
                        column: 12
                    },
                    end: {
                        line: 98,
                        column: 13
                    }
                }],
                line: 91
            },
            '10': {
                loc: {
                    start: {
                        line: 91,
                        column: 16
                    },
                    end: {
                        line: 91,
                        column: 49
                    }
                },
                type: 'binary-expr',
                locations: [{
                    start: {
                        line: 91,
                        column: 16
                    },
                    end: {
                        line: 91,
                        column: 20
                    }
                }, {
                    start: {
                        line: 91,
                        column: 24
                    },
                    end: {
                        line: 91,
                        column: 49
                    }
                }],
                line: 91
            },
            '11': {
                loc: {
                    start: {
                        line: 101,
                        column: 27
                    },
                    end: {
                        line: 101,
                        column: 39
                    }
                },
                type: 'default-arg',
                locations: [{
                    start: {
                        line: 101,
                        column: 37
                    },
                    end: {
                        line: 101,
                        column: 39
                    }
                }],
                line: 101
            },
            '12': {
                loc: {
                    start: {
                        line: 107,
                        column: 8
                    },
                    end: {
                        line: 109,
                        column: 9
                    }
                },
                type: 'if',
                locations: [{
                    start: {
                        line: 107,
                        column: 8
                    },
                    end: {
                        line: 109,
                        column: 9
                    }
                }, {
                    start: {
                        line: 107,
                        column: 8
                    },
                    end: {
                        line: 109,
                        column: 9
                    }
                }],
                line: 107
            },
            '13': {
                loc: {
                    start: {
                        line: 107,
                        column: 12
                    },
                    end: {
                        line: 107,
                        column: 59
                    }
                },
                type: 'binary-expr',
                locations: [{
                    start: {
                        line: 107,
                        column: 12
                    },
                    end: {
                        line: 107,
                        column: 20
                    }
                }, {
                    start: {
                        line: 107,
                        column: 24
                    },
                    end: {
                        line: 107,
                        column: 33
                    }
                }, {
                    start: {
                        line: 107,
                        column: 37
                    },
                    end: {
                        line: 107,
                        column: 59
                    }
                }],
                line: 107
            },
            '14': {
                loc: {
                    start: {
                        line: 110,
                        column: 8
                    },
                    end: {
                        line: 112,
                        column: 9
                    }
                },
                type: 'if',
                locations: [{
                    start: {
                        line: 110,
                        column: 8
                    },
                    end: {
                        line: 112,
                        column: 9
                    }
                }, {
                    start: {
                        line: 110,
                        column: 8
                    },
                    end: {
                        line: 112,
                        column: 9
                    }
                }],
                line: 110
            }
        },
        s: {
            '0': 0,
            '1': 0,
            '2': 0,
            '3': 0,
            '4': 0,
            '5': 0,
            '6': 0,
            '7': 0,
            '8': 0,
            '9': 0,
            '10': 0,
            '11': 0,
            '12': 0,
            '13': 0,
            '14': 0,
            '15': 0,
            '16': 0,
            '17': 0,
            '18': 0,
            '19': 0,
            '20': 0,
            '21': 0,
            '22': 0,
            '23': 0,
            '24': 0,
            '25': 0,
            '26': 0,
            '27': 0,
            '28': 0,
            '29': 0,
            '30': 0,
            '31': 0,
            '32': 0,
            '33': 0,
            '34': 0,
            '35': 0,
            '36': 0,
            '37': 0,
            '38': 0,
            '39': 0,
            '40': 0,
            '41': 0,
            '42': 0,
            '43': 0,
            '44': 0,
            '45': 0,
            '46': 0,
            '47': 0,
            '48': 0,
            '49': 0,
            '50': 0,
            '51': 0,
            '52': 0,
            '53': 0,
            '54': 0,
            '55': 0,
            '56': 0,
            '57': 0,
            '58': 0,
            '59': 0,
            '60': 0,
            '61': 0,
            '62': 0,
            '63': 0,
            '64': 0,
            '65': 0,
            '66': 0,
            '67': 0,
            '68': 0,
            '69': 0
        },
        f: {
            '0': 0,
            '1': 0,
            '2': 0,
            '3': 0,
            '4': 0,
            '5': 0,
            '6': 0,
            '7': 0,
            '8': 0,
            '9': 0,
            '10': 0,
            '11': 0,
            '12': 0,
            '13': 0,
            '14': 0,
            '15': 0,
            '16': 0,
            '17': 0,
            '18': 0,
            '19': 0,
            '20': 0,
            '21': 0,
            '22': 0,
            '23': 0,
            '24': 0,
            '25': 0,
            '26': 0,
            '27': 0
        },
        b: {
            '0': [0],
            '1': [0, 0],
            '2': [0, 0],
            '3': [0, 0],
            '4': [0, 0],
            '5': [0, 0],
            '6': [0, 0],
            '7': [0, 0],
            '8': [0, 0],
            '9': [0, 0],
            '10': [0, 0],
            '11': [0],
            '12': [0, 0],
            '13': [0, 0, 0],
            '14': [0, 0]
        },
        _coverageSchema: '332fd63041d2c1bcb487cc26dd0d5f7d97098a6c'
    },
        coverage = global[gcv] || (global[gcv] = {});

    if (coverage[path] && coverage[path].hash === hash) {
        return coverage[path];
    }

    coverageData.hash = hash;
    return coverage[path] = coverageData;
}();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _axios = __webpack_require__(11);

var _axios2 = _interopRequireDefault(_axios);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Request = function Request(url) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : (cov_15j8tpybze.b[0][0]++, {});

    _classCallCheck(this, Request);

    _initialiseProps.call(this);

    cov_15j8tpybze.f[0]++;
    cov_15j8tpybze.s[0]++;

    this.timeouts = {};
    cov_15j8tpybze.s[1]++;
    this.cancelMethods = {};
    cov_15j8tpybze.s[2]++;
    this.pending = {};
    cov_15j8tpybze.s[3]++;
    this.updating = {};
    cov_15j8tpybze.s[4]++;
    this.pollingInProgress = {};
    cov_15j8tpybze.s[5]++;
    this.options = {
        lockable: false,
        cancelable: true
    };
    cov_15j8tpybze.s[6]++;
    this.setOptions(options);
    cov_15j8tpybze.s[7]++;
    this.setUrl(url);
};

var _initialiseProps = function _initialiseProps() {
    var _this = this;

    this.setOptions = function (options) {
        cov_15j8tpybze.f[1]++;
        cov_15j8tpybze.s[8]++;

        _this.option = Object.assign(_this.options, options);
    };

    this.setUrl = function (url) {
        cov_15j8tpybze.f[2]++;
        cov_15j8tpybze.s[9]++;

        _this.url = url;
    };

    this.setTimeout = function (timeout, method) {
        cov_15j8tpybze.f[3]++;
        cov_15j8tpybze.s[10]++;

        _this.timeouts[method] = timeout;
    };

    this.cancel = function (method) {
        cov_15j8tpybze.f[4]++;
        cov_15j8tpybze.s[11]++;

        if (method) {
            cov_15j8tpybze.b[1][0]++;

            var cancel = (cov_15j8tpybze.s[12]++, _this.cancelMethods[method]);
            var timeout = (cov_15j8tpybze.s[13]++, _this.timeouts[method]);

            cov_15j8tpybze.s[14]++;
            if (typeof cancel === 'function') {
                cov_15j8tpybze.b[2][0]++;
                cov_15j8tpybze.s[15]++;

                cancel();
            } else {
                cov_15j8tpybze.b[2][1]++;
            }
            cov_15j8tpybze.s[16]++;
            if (timeout) {
                cov_15j8tpybze.b[3][0]++;
                cov_15j8tpybze.s[17]++;

                clearTimeout(timeout);
            } else {
                cov_15j8tpybze.b[3][1]++;
            }
        } else {
            cov_15j8tpybze.b[1][1]++;
            cov_15j8tpybze.s[18]++;

            Object.keys(_this.cancelMethods).forEach(function (reqMethod) {
                cov_15j8tpybze.f[5]++;
                cov_15j8tpybze.s[19]++;
                return _this.cancelMethods[reqMethod]();
            });
            cov_15j8tpybze.s[20]++;
            Object.keys(_this.timeouts).forEach(function (reqMethod) {
                cov_15j8tpybze.f[6]++;
                cov_15j8tpybze.s[21]++;
                return clearTimeout(_this.timeouts[reqMethod]);
            });
        }
        cov_15j8tpybze.s[22]++;
        return _this;
    };

    this.isPending = function (method) {
        cov_15j8tpybze.f[7]++;
        cov_15j8tpybze.s[23]++;

        if (method) {
            cov_15j8tpybze.b[4][0]++;
            cov_15j8tpybze.s[24]++;

            return !!_this.pending[method];
        } else {
            cov_15j8tpybze.b[4][1]++;
        }
        cov_15j8tpybze.s[25]++;
        return Object.keys(_this.pending).some(function (pendingMethod) {
            cov_15j8tpybze.f[8]++;
            cov_15j8tpybze.s[26]++;
            return _this.pending[pendingMethod];
        });
    };

    this.isPolling = function (method) {
        cov_15j8tpybze.f[9]++;
        cov_15j8tpybze.s[27]++;

        if (method) {
            cov_15j8tpybze.b[5][0]++;
            cov_15j8tpybze.s[28]++;

            return !!_this.pollingInProgress[method];
        } else {
            cov_15j8tpybze.b[5][1]++;
        }
        cov_15j8tpybze.s[29]++;
        return Object.keys(_this.pollingInProgress).some(function (pollingMethod) {
            cov_15j8tpybze.f[10]++;
            cov_15j8tpybze.s[30]++;
            return _this.pollingInProgress[pollingMethod];
        });
    };

    this.isUpdating = function (method) {
        cov_15j8tpybze.f[11]++;
        cov_15j8tpybze.s[31]++;

        if (method) {
            cov_15j8tpybze.b[6][0]++;
            cov_15j8tpybze.s[32]++;

            return !!_this.updating[method];
        } else {
            cov_15j8tpybze.b[6][1]++;
        }
        cov_15j8tpybze.s[33]++;
        return Object.keys(_this.updating).some(function (updatingMethod) {
            cov_15j8tpybze.f[12]++;
            cov_15j8tpybze.s[34]++;
            return _this.updating[updatingMethod];
        });
    };

    this.setOffPendingStatus = function (method) {
        cov_15j8tpybze.f[13]++;
        cov_15j8tpybze.s[35]++;

        _this.pending[method] = false;
        cov_15j8tpybze.s[36]++;
        _this.updating[method] = false;
    };

    this.setOffPendingStatusThen = function (response, method) {
        cov_15j8tpybze.f[14]++;
        cov_15j8tpybze.s[37]++;

        _this.setOffPendingStatus(method);
        cov_15j8tpybze.s[38]++;
        return response;
    };

    this.setOffPendingStatusCatch = function (error, method) {
        cov_15j8tpybze.f[15]++;
        cov_15j8tpybze.s[39]++;

        _this.setOffPendingStatus(method);
        cov_15j8tpybze.s[40]++;
        _this.pollingInProgress[method] = false;
        cov_15j8tpybze.s[41]++;
        if (_this.options.errorHandler) {
            cov_15j8tpybze.b[7][0]++;
            cov_15j8tpybze.s[42]++;

            _this.options.errorHandler(error, method);
        } else {
            cov_15j8tpybze.b[7][1]++;
            cov_15j8tpybze.s[43]++;

            throw error;
        }
    };

    this.poll = function (time) {
        cov_15j8tpybze.f[16]++;
        cov_15j8tpybze.s[44]++;
        return {
            get: function get(cl, options) {
                cov_15j8tpybze.f[17]++;
                cov_15j8tpybze.s[45]++;
                return _this.pollingRequest(cl, options, time, 'get');
            },
            post: function post(cl, options) {
                cov_15j8tpybze.f[18]++;
                cov_15j8tpybze.s[46]++;
                return _this.pollingRequest(cl, options, time, 'post');
            }
        };
    };

    this.get = function (options) {
        cov_15j8tpybze.f[19]++;
        cov_15j8tpybze.s[47]++;
        return _this.sendRequest('get', options);
    };

    this.post = function (options) {
        cov_15j8tpybze.f[20]++;
        cov_15j8tpybze.s[48]++;
        return _this.sendRequest('post', options);
    };

    this.pollingRequest = function (cl, options, time, method, updating) {
        cov_15j8tpybze.f[21]++;
        cov_15j8tpybze.s[49]++;
        return _this.sendRequest(method, options, updating).then(function (response) {
            cov_15j8tpybze.f[22]++;
            cov_15j8tpybze.s[50]++;

            _this.pollingInProgress[method] = true;
            var continuePolling = void 0;
            cov_15j8tpybze.s[51]++;
            if (cl) {
                cov_15j8tpybze.b[8][0]++;
                cov_15j8tpybze.s[52]++;

                continuePolling = cl(response);
            } else {
                cov_15j8tpybze.b[8][1]++;
            }
            cov_15j8tpybze.s[53]++;
            if ((cov_15j8tpybze.b[10][0]++, time) && (cov_15j8tpybze.b[10][1]++, continuePolling !== false)) {
                cov_15j8tpybze.b[9][0]++;

                var timeOut = (cov_15j8tpybze.s[54]++, setTimeout(function () {
                    cov_15j8tpybze.f[23]++;
                    cov_15j8tpybze.s[55]++;

                    _this.pollingRequest(cl, options, time, method, true);
                }, time));
                cov_15j8tpybze.s[56]++;
                _this.setTimeout(timeOut, method);
            } else {
                cov_15j8tpybze.b[9][1]++;
                cov_15j8tpybze.s[57]++;

                _this.pollingInProgress[method] = false;
            }
            cov_15j8tpybze.s[58]++;
            return response;
        });
    };

    this.sendRequest = function (method) {
        var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : (cov_15j8tpybze.b[11][0]++, {});
        var updating = arguments[2];
        cov_15j8tpybze.f[24]++;

        var _ref = (cov_15j8tpybze.s[59]++, Object.assign({}, _this.options, options)),
            lockable = _ref.lockable,
            cancelable = _ref.cancelable,
            axiosOption = _objectWithoutProperties(_ref, ['lockable', 'cancelable']);

        cov_15j8tpybze.s[60]++;

        if ((cov_15j8tpybze.b[13][0]++, lockable) && (cov_15j8tpybze.b[13][1]++, !updating) && (cov_15j8tpybze.b[13][2]++, _this.isPending(method))) {
            cov_15j8tpybze.b[12][0]++;
            cov_15j8tpybze.s[61]++;

            return Promise.reject(new Error('Request in progress'));
        } else {
            cov_15j8tpybze.b[12][1]++;
        }
        cov_15j8tpybze.s[62]++;
        if (cancelable) {
            cov_15j8tpybze.b[14][0]++;
            cov_15j8tpybze.s[63]++;

            _this.cancel(method);
        } else {
            cov_15j8tpybze.b[14][1]++;
        }
        cov_15j8tpybze.s[64]++;
        _this.updating[method] = !!updating;
        cov_15j8tpybze.s[65]++;
        _this.pending[method] = true;
        cov_15j8tpybze.s[66]++;
        return (0, _axios2.default)(_extends({}, axiosOption, {
            method: method,
            url: _this.url,
            cancelToken: new _axios2.default.CancelToken(function (c) {
                cov_15j8tpybze.f[25]++;
                cov_15j8tpybze.s[67]++;

                _this.cancelMethods[method] = c;
            })
        })).then(function (res) {
            cov_15j8tpybze.f[26]++;
            cov_15j8tpybze.s[68]++;
            return _this.setOffPendingStatusThen(res, method);
        }).catch(function (err) {
            cov_15j8tpybze.f[27]++;
            cov_15j8tpybze.s[69]++;
            return _this.setOffPendingStatusCatch(err, method);
        });
    };
};

exports.default = Request;

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = __webpack_require__(12);

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(0);
var bind = __webpack_require__(1);
var Axios = __webpack_require__(14);
var mergeConfig = __webpack_require__(7);
var defaults = __webpack_require__(4);

/**
 * Create an instance of Axios
 *
 * @param {Object} defaultConfig The default config for the instance
 * @return {Axios} A new instance of Axios
 */
function createInstance(defaultConfig) {
  var context = new Axios(defaultConfig);
  var instance = bind(Axios.prototype.request, context);

  // Copy axios.prototype to instance
  utils.extend(instance, Axios.prototype, context);

  // Copy context to instance
  utils.extend(instance, context);

  return instance;
}

// Create the default instance to be exported
var axios = createInstance(defaults);

// Expose Axios class to allow class inheritance
axios.Axios = Axios;

// Factory for creating new instances
axios.create = function create(instanceConfig) {
  return createInstance(mergeConfig(axios.defaults, instanceConfig));
};

// Expose Cancel & CancelToken
axios.Cancel = __webpack_require__(8);
axios.CancelToken = __webpack_require__(27);
axios.isCancel = __webpack_require__(3);

// Expose all/spread
axios.all = function all(promises) {
  return Promise.all(promises);
};
axios.spread = __webpack_require__(28);

module.exports = axios;

// Allow use of default import syntax in TypeScript
module.exports.default = axios;

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/*!
 * Determine if an object is a Buffer
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */

module.exports = function isBuffer(obj) {
  return obj != null && obj.constructor != null && typeof obj.constructor.isBuffer === 'function' && obj.constructor.isBuffer(obj);
};

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(0);
var buildURL = __webpack_require__(2);
var InterceptorManager = __webpack_require__(15);
var dispatchRequest = __webpack_require__(16);
var mergeConfig = __webpack_require__(7);

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

  config = mergeConfig(this.defaults, config);
  config.method = config.method ? config.method.toLowerCase() : 'get';

  // Hook up interceptors middleware
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
};

// Provide aliases for supported request methods
utils.forEach(['delete', 'get', 'head', 'options'], function forEachMethodNoData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function (url, config) {
    return this.request(utils.merge(config || {}, {
      method: method,
      url: url
    }));
  };
});

utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function (url, data, config) {
    return this.request(utils.merge(config || {}, {
      method: method,
      url: url,
      data: data
    }));
  };
});

module.exports = Axios;

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(0);

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
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(0);
var transformData = __webpack_require__(17);
var isCancel = __webpack_require__(3);
var defaults = __webpack_require__(4);
var isAbsoluteURL = __webpack_require__(25);
var combineURLs = __webpack_require__(26);

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
  throwIfCancellationRequested(config);

  // Support baseURL config
  if (config.baseURL && !isAbsoluteURL(config.url)) {
    config.url = combineURLs(config.baseURL, config.url);
  }

  // Ensure headers exist
  config.headers = config.headers || {};

  // Transform request data
  config.data = transformData(config.data, config.headers, config.transformRequest);

  // Flatten headers
  config.headers = utils.merge(config.headers.common || {}, config.headers[config.method] || {}, config.headers || {});

  utils.forEach(['delete', 'get', 'head', 'post', 'put', 'patch', 'common'], function cleanHeaderConfig(method) {
    delete config.headers[method];
  });

  var adapter = config.adapter || defaults.adapter;

  return adapter(config).then(function onAdapterResolution(response) {
    throwIfCancellationRequested(config);

    // Transform response data
    response.data = transformData(response.data, response.headers, config.transformResponse);

    return response;
  }, function onAdapterRejection(reason) {
    if (!isCancel(reason)) {
      throwIfCancellationRequested(config);

      // Transform response data
      if (reason && reason.response) {
        reason.response.data = transformData(reason.response.data, reason.response.headers, config.transformResponse);
      }
    }

    return Promise.reject(reason);
  });
};

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(0);

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
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout() {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
})();
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch (e) {
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch (e) {
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }
}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e) {
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e) {
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }
}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while (len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) {
    return [];
};

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () {
    return '/';
};
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function () {
    return 0;
};

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(0);

module.exports = function normalizeHeaderName(headers, normalizedName) {
  utils.forEach(headers, function processHeader(value, name) {
    if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
      headers[normalizedName] = value;
      delete headers[name];
    }
  });
};

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var createError = __webpack_require__(6);

/**
 * Resolve or reject a Promise based on response status.
 *
 * @param {Function} resolve A function that resolves the promise.
 * @param {Function} reject A function that rejects the promise.
 * @param {object} response The response.
 */
module.exports = function settle(resolve, reject, response) {
  var validateStatus = response.config.validateStatus;
  if (!validateStatus || validateStatus(response.status)) {
    resolve(response);
  } else {
    reject(createError('Request failed with status code ' + response.status, response.config, null, response.request, response));
  }
};

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

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

  error.toJSON = function () {
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
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(0);

// Headers whose duplicates are ignored by node
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
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(0);

module.exports = utils.isStandardBrowserEnv() ?

// Standard browser envs have full support of the APIs needed to test
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

    urlParsingNode.setAttribute('href', href);

    // urlParsingNode provides the UrlUtils interface - http://url.spec.whatwg.org/#urlutils
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
}() :

// Non standard browser envs (web workers, react-native) lack needed support.
function nonStandardBrowserEnv() {
  return function isURLSameOrigin() {
    return true;
  };
}();

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(0);

module.exports = utils.isStandardBrowserEnv() ?

// Standard browser envs support document.cookie
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
}() :

// Non standard browser env (web workers, react-native) lack needed support.
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
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

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
  return (/^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(url)
  );
};

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

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
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Cancel = __webpack_require__(8);

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
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

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

/***/ })
/******/ ]);
});
//# sourceMappingURL=axios-request.js.map