'use strict'

var Promise = require('es6-promise').Promise

module.exports = promiseOne

function promiseOne (promises) {
  var errors = []
  var errorCount = 0
  var error

  return new Promise(function (resolve, reject) {
    promises.forEach(function (promise, idx) {
      promise.then(resolve).catch(pushErrors(idx))
    })

    function pushErrors (idx) {
      return function (err) {
        errors[idx] = err

        if (++errorCount === promises.length) {
          error = new Error('no promises resolved')
          error.errors = errors

          reject(error)
        }
      }
    }
  })
}
