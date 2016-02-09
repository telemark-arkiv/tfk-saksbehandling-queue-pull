'use strict'

var pullFromQueue = require('./index')
var options = {
  key: 'NeverShareYourSecret',
  payload: {
    system: 'tfk-saksbehandling-queue-pull'
  },
  jobFolderPath: 'test/data/jobs',
  queueNextUrl: 'http://localhost:8000/api/queue/next',
  deleteFromQueueUrl: 'http://localhost:8000/api/queue',
  statusMessage: 'Til behandling',
  statusMessageUrl: 'http://localhost:8000/api/logs'
}

pullFromQueue(options, function (error, data) {
  if (error) {
    console.error(error)
  } else {
    console.log(data)
  }
})
