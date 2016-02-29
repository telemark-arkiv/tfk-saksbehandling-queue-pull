'use strict'

var tap = require('tap')
var pullFromQueue = require('../index')

tap.test('it requires an options object', function (test) {
  var options = false
  var expectedErrorMessage = 'Missing required input: options object'
  pullFromQueue(options, function (error, data) {
    tap.equal(error.message, expectedErrorMessage, expectedErrorMessage)
    test.done()
  })
})

tap.test('it requires options.key to exist', function (test) {
  var options = {
    key: false
  }
  var expectedErrorMessage = 'Missing required input: options.key'
  pullFromQueue(options, function (error, data) {
    tap.equal(error.message, expectedErrorMessage, expectedErrorMessage)
    test.done()
  })
})

tap.test('it requires options.payload to exist', function (test) {
  var options = {
    key: true,
    payload: false
  }
  var expectedErrorMessage = 'Missing required input: options.payload'
  pullFromQueue(options, function (error, data) {
    tap.equal(error.message, expectedErrorMessage, expectedErrorMessage)
    test.done()
  })
})

tap.test('it requires options.jobFolderPath to exist', function (test) {
  var options = {
    key: true,
    payload: true,
    jobFolderPath: false
  }
  var expectedErrorMessage = 'Missing required input: options.jobFolderPath'
  pullFromQueue(options, function (error, data) {
    tap.equal(error.message, expectedErrorMessage, expectedErrorMessage)
    test.done()
  })
})

tap.test('it requires options.jobFolderPath to be a directory', function (test) {
  var options = {
    key: true,
    payload: true,
    jobFolderPath: '/this/is/not/a/directory'
  }
  var expectedErrorMessage = 'Invalid input: options.jobFolderPath is not a directory'
  pullFromQueue(options, function (error, data) {
    tap.equal(error.message, expectedErrorMessage, expectedErrorMessage)
    test.done()
  })
})

tap.test('it requires options.queueNextUrl to exist', function (test) {
  var options = {
    key: true,
    payload: true,
    jobFolderPath: 'test',
    queueNextUrl: false
  }
  var expectedErrorMessage = 'Missing required input: options.queueNextUrl'
  pullFromQueue(options, function (error, data) {
    tap.equal(error.message, expectedErrorMessage, expectedErrorMessage)
    test.done()
  })
})

tap.test('it requires options.deleteFromQueueUrl to exist', function (test) {
  var options = {
    key: true,
    payload: true,
    jobFolderPath: 'test',
    queueNextUrl: true,
    deleteFromQueueUrl: false
  }
  var expectedErrorMessage = 'Missing required input: options.deleteFromQueueUrl'
  pullFromQueue(options, function (error, data) {
    tap.equal(error.message, expectedErrorMessage, expectedErrorMessage)
    test.done()
  })
})

tap.test('it requires options.statusMessage to exist', function (test) {
  var options = {
    key: true,
    payload: true,
    jobFolderPath: 'test',
    queueNextUrl: true,
    deleteFromQueueUrl: true,
    statusMessage: false
  }
  var expectedErrorMessage = 'Missing required input: options.statusMessage'
  pullFromQueue(options, function (error, data) {
    tap.equal(error.message, expectedErrorMessage, expectedErrorMessage)
    test.done()
  })
})
