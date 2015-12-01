'use strict'

const Promise = require('es6-promise').Promise
const test = require('tape')

const promiseOne = require('../')

test('resolves as long as one promise resolves', function (t) {
  t.plan(1)

  promiseOne([Promise.reject(new Error()), Promise.resolve('lol'), Promise.reject(new Error())])
    .then(function (data) {
      t.equal(data, 'lol')
      t.end()
    }).catch(t.fail)
})

test('rejects if all promises reject', function (t) {
  t.plan(1)

  promiseOne([Promise.reject(new Error())]).then(t.fail).catch(t.pass)
})

test('does not matter if the resolve happens last', function (t) {
  t.plan(1)

  promiseOne([
    Promise.reject(new Error()),
    new Promise(function (resolve, reject) {
      setTimeout(function () {
        resolve('wee')
      }, 300)
    })
  ])
})

test('errors provided for all rejected and in correct order', function (t) {
  t.plan(1)

  const errors = [new Error('lol'), new Error('rofl'), new Error('hardyhar')]

  promiseOne([
    new Promise(function (resolve, reject) {
      setTimeout(function () {
        reject(errors[0])
      })
    }, 300),
    new Promise(function (resolve, reject) {
      setTimeout(function () {
        reject(errors[1])
      }, 200)
    }),
    new Promise(function (resolve, reject) {
      setTimeout(function() {
        reject(errors[2])
      }, 100)
    })
  ]).then(t.fail).catch(function (error) {
    t.deepEqual(error.errors, errors)
  })
})
