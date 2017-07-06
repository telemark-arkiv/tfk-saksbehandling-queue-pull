'use strict'

const isDirectory = require('is-directory')

module.exports = (options, callback) => {
  if (!options) {
    return callback(new Error('Missing required input: options object'), null)
  }

  if (!options.key) {
    return callback(new Error('Missing required input: options.key'), null)
  }

  if (!options.payload) {
    return callback(new Error('Missing required input: options.payload'), null)
  }

  if (!options.jobFolderPath) {
    return callback(new Error('Missing required input: options.jobFolderPath'), null)
  }

  if (!options.copiesFolderPath) {
    return callback(new Error('Missing required input: options.copiesFolderPath'), null)
  }

  if (!isDirectory.sync(options.jobFolderPath)) {
    return callback(new Error('Invalid input: options.jobFolderPath is not a directory'), null)
  }

  if (!isDirectory.sync(options.copiesFolderPath)) {
    return callback(new Error('Invalid input: options.copiesFolderPath is not a directory'), null)
  }

  if (!options.queueNextUrl) {
    return callback(new Error('Missing required input: options.queueNextUrl'), null)
  }

  if (!options.deleteFromQueueUrl) {
    return callback(new Error('Missing required input: options.deleteFromQueueUrl'), null)
  }

  if (!options.statusMessage) {
    return callback(new Error('Missing required input: options.statusMessage'), null)
  }

  const fs = require('fs')
  const Wreck = require('wreck')
  const generateToken = require('tfk-generate-jwt')
  const token = generateToken({key: options.key, payload: options.payload})
  let wreckOptions = {
    json: true,
    headers: {
      Authorization: token
    }
  }
  let job
  let CALLBACK_STATUS_URL

  function handleStatusUpdates (error, response, payload) {
    if (error) {
      return callback(error, null)
    } else {
      return callback(null, {message: 'Job ' + job._id + ' downloaded. Status updated.'})
    }
  }

  function handleDelete (error, response, payload) {
    if (error) {
      return callback(error, null)
    } else {
      if (CALLBACK_STATUS_URL) {
        wreckOptions.payload = JSON.stringify({status: options.statusMessage})
        Wreck.post(CALLBACK_STATUS_URL, wreckOptions, handleStatusUpdates)
      } else {
        return callback(null, {message: 'Job ' + job._id + ' downloaded.'})
      }
    }
  }

  function handleWrite (error) {
    if (error) {
      return callback(error, null)
    } else {
      Wreck.delete(options.deleteFromQueueUrl + '/' + job._id, wreckOptions, handleDelete)
    }
  }

  function handleCopyWrite (error) {
    if (error) {
      return callback(error, null)
    } else {
      console.log('Copy written')
    }
  }

  function handleNext (error, response, payload) {
    if (error) {
      return callback(error, null)
    } else if (response.statusCode !== 200) {
      return callback(new Error('Unexpected statuscode: ' + response.statusCode), null)
    } else {
      if (payload && payload.length > 0) {
        job = payload[0]
        if (job.CALLBACK_STATUS_URL) {
          CALLBACK_STATUS_URL = job.CALLBACK_STATUS_URL + '/' + job._id
          job.CALLBACK_STATUS_URL = CALLBACK_STATUS_URL
        }
        fs.writeFile(options.copiesFolderPath + '/' + job._id + '.json', JSON.stringify(job, null, 2), 'utf-8', handleCopyWrite)
        fs.writeFile(options.jobFolderPath + '/' + job._id + '.json', JSON.stringify(job, null, 2), 'utf-8', handleWrite)
      } else {
        return callback(null, {message: 'No jobs in queue'})
      }
    }
  }

  Wreck.get(options.queueNextUrl, wreckOptions, handleNext)
}
