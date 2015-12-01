# promise-one

[![Build Status](http://img.shields.io/travis/jarofghosts/promise-one.svg?style=flat-square)](https://travis-ci.org/jarofghosts/promise-one)
[![npm install](http://img.shields.io/npm/dm/promise-one.svg?style=flat-square)](https://www.npmjs.org/package/promise-one)
[![npm version](https://img.shields.io/npm/v/promise-one.svg?style=flat-square)](https://www.npmjs.org/package/promise-one)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat-square)](https://github.com/feross/standard)
[![License](https://img.shields.io/npm/l/promise-one.svg?style=flat-square)](https://github.com/jarofghosts/promise-one/blob/master/LICENSE)


Promise that at least one promise will resolve

## Example

```javascript
const promiseOne = require('promise-one')

promiseOne([promise1, promise2, promise3])
  .then(function (data) {
    // one of them worked!
    console.log(data)
  })
  .catch(function (err) {
    // they all rejected :(
  })
```

## API

`promiseOne([promise1, ...]) -> Promise`

* Accepts an array of promises

## Notes

* Rejections will _disappear_ if any promise resolves, with no way to get them.
* If _all_ promises reject, their errors will be available on the rejected reason
  under the `errors` key in the order they were specified in the original array.

## License

MIT
