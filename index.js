'use strict'

const Promise = require('es6-promise').Promise

module.exports = promiseOne

function promiseOne (promises) {
  const errors = []
  let errorCount = 0

  return new Promise(function (resolve, reject) {
    promises.forEach(function (promise, idx) {
      promise.then(resolve).catch(pushErrors(idx))
    })

    function pushErrors (idx) {
      return function (err) {
        errors[idx] = err

        if (++errorCount === promises.length) {
          const error = new Error('no promises resolved')
          error.errors = errors

          reject(error)
        }
      }
    }
  })
}
