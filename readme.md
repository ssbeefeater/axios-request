# axios-request

An [axios](https://github.com/axios/axios) handler for making requests with polling, lock and cancel support.

---


[Installation](#installation)

[Examples](#examples)

[API](#api)


---

#### Installation

Install with [yarn](https://yarnpkg.com) or [npm](https://www.npmjs.com/)

```sh
yarn add axios-request-handler
        #or
npm install axios-request-handler
```
---
#### API

```javascript
import Request from 'axios-request-handler';

const requestInstance = new Request(url = '', options = {
    lockable: false, // if true if you try to make a request when there is a pending one, the second will not be executed
    cancelable: true, // if true if you try to make a request when there is a pending one, the first will be canceled and the new will executed
    errorHandler:(error,method) => {} // function for handling the errors
    axiosInstance: undefined, // custom axios instance
    ...axionOptions, // all the supported options from axios
})

// send request

requestInstance.get() // sends a get request with the above axios options
requestInstance.post()// sends a post request with the above axios options

requestInstance.get(options = {}) // sends a get request overriding the above options
requestInstance.post(options = {})// sends a post request overriding the above options

// cancel request

requestInstance.cancel() // cancel all requests
requestInstance.cancel(method = 'get') // cancel get request
requestInstance.cancel(method = 'post') // cancel post request

// polling requests
requestInstance.poll(intervalTime = 2000).get(callback = (response) => {
    //callback function that executes in every response
    //if return false the interval will discontinue
}, options = {})


//request status

requestInstance.isPending(method = '') // returns true when a request is on the fly
requestInstance.isUpdating(method = 'post') // returns true when a request is on the fly after interval request
requestInstance.isPolling(method = 'get') // returns true when polling is enabled

//setters

requestInstance.setOptions(options = {}) // changes the instance's options
requestInstance.setUrl(options = {}) // changes the instance's url

```

#### Examples

Basic

```javascript
import Request from 'axios-request-handler';

const products = new Request('http://example.com/api/products', {
    params: {
        category: 'keyboards'
    }
});

products.get().then(res => (console.log(res.data)));

products.get({
    params: {
        category: 'mouses'
    }
}).then(res => (console.log(res.data)));
```
Polling

```javascript
import Request from 'axios-request-handler';

const reviews = new Request('http://example.com/api/reviews');

reviews.poll(5000).get((response) => {
    console.log(response.data);
    // you can cancel polling by returning false
});
```
Cancel pending requests
```javascript
import Request from 'axios-request-handler';

const reviews = new Request('http://example.com/api/reviews');

// cancel all
reviews.get();
reviews.cancel();

// cancel get request
reviews.get();
reviews.post();

reviews.cancel('get');

// cancel post request
reviews.get();
reviews.post();

reviews.cancel('post');
```
Check request status
```javascript
import Request from 'axios-request-handler';

const reviews = new Request('http://example.com/api/reviews');

// pending status
reviews.get().then(res => {
    reviews.isPending(); // false
})
reviews.isPending(); // true

// updating status
reviews.poll(1000).get().then(res => {
   setTimeout(()=> {
        reviews.isPending('get'); // true
        reviews.isUpdating('get'); // true
    }, 1000);
})

reviews.isPending('get'); //true
reviews.isUpdating('get'); //false (this will be true when the interval request start and the request is pending)

reviews.cancel('get');

// polling status
reviews.poll(1000).get();
reviews.isPending(); //true
reviews.isUpdating(); //false
reviews.isPolling(); //true
```
Lockable, Cancelable

```javascript
import Request from 'axios-request-handler';

 // cancelable
const reviews = new Request('http://example.com/api/reviews', {
    cancelable:true, //default is true
});
reviews.get(); // this request will be canceled by the next one
reviews.get();

// ----------------------

const reviews = new Request('http://example.com/api/reviews', {
    cancelable:false, //default is true
});
reviews.get(); // both requests will be executed
reviews.get();

// ----------------------

// lockable
const reviews = new Request('http://example.com/api/reviews', {
    lockable:true, //default is false
});
reviews.get();
reviews.get(); // this request will not be executed and will throw Promise error;
```

Using custom Axios instance

Case you want to reuse an active `axios` instance, this is useful when you are working with JWT and don't want to set Authorization Header again.

```javascript
import Request from 'axios-request-handler';
import axiosInstance from './axios-instance'

const products = new Request('http://example.com/api/products', {
    params: {
        category: 'keyboards'
    },
    axiosInstance
});

products.get().then(res => (console.log(res.data)));

// the next requests will continue using the custom axios instance
products.get({
    params: {
        category: 'mouses'
    }
}).then(res => (console.log(res.data)));
```

---

To run tests:
```sh
yarn test
   #or
npm test
```

