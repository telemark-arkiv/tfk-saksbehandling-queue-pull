'use strict'

module.exports = {
  JWT_KEY: process.env.TFK_SQP_JWT_KEY || 'Louie Louie, oh no, I got to go. Louie Louie, oh no, I got to go',
  CALLBACK_STATUS_MESSAGE: process.env.TFK_SQP_CALLBACK_STATUS_MESSAGE || 'Til behandling',
  JOB_DIRECTORY_PATH: process.env.TFK_SQP_JOB_DIRECTORY_PATH || 'test/data/jobs',
  COPIES_DIRECTORY_PATH: process.env.TFK_SQP_COPIES_DIRECTORY_PATH || 'test/data/copies',
  QUEUE_NEXT_URL: process.env.TFK_SQP_QUEUE_NEXT_URL || 'https://example.com/api/queue/next',
  QUEUE_DELETE_URL: process.env.TFK_SQP_QUEUE_DELETE_URL || 'https://example.com/api/queue'
}
