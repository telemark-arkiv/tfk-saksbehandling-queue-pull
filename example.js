'use strict'

const pullFromQueue = require('./index')
const config = require('./config')
const options = {
  key: config.JWT_KEY,
  payload: {
    system: 'tfk-saksbehandling-queue-pull'
  },
  jobFolderPath: config.JOB_DIRECTORY_PATH,
  copiesFolderPath: config.COPIES_DIRECTORY_PATH,
  queueNextUrl: config.QUEUE_NEXT_URL,
  deleteFromQueueUrl: config.QUEUE_DELETE_URL,
  statusMessage: config.CALLBACK_STATUS_MESSAGE
}

pullFromQueue(options, (error, data) => {
  if (error) {
    console.error(error)
  } else {
    console.log(data)
  }
})
