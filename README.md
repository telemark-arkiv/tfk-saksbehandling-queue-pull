[![Build Status](https://travis-ci.org/telemark/tfk-saksbehandling-queue-pull.svg?branch=master)](https://travis-ci.org/telemark/tfk-saksbehandling-queue-pull)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](https://github.com/feross/standard)
[![Greenkeeper badge](https://badges.greenkeeper.io/telemark/tfk-saksbehandling-queue-pull.svg)](https://greenkeeper.io/)

# tfk-saksbehandling-queue-pull

Pulls next job from the saksbehandling queue and saves it as a .json-file in a directory of your choice.

It will save a copy of the file as well.

Sends statusupdate to the systemlog,

## Installation

From npm

```sh
$ npm install tfk-saksbehandling-queue-pull
```

from github

```sh
$ git clone git@github.com:telemark/tfk-saksbehandling-queue-pull.git
```

cd into directory and run setup

```sh
$ npm run setup
```

## Usage

```javascript
'use strict'

const pullFromQueue = require('tfk-saksbehandling-queue-pull')
const options = {
  key: 'NeverShareYourSecret',
  payload: {
    system: 'tfk-saksbehandling-queue-pull'
  },
  jobFolderPath: 'jobs/',
  copiesFolderPath: 'copies/',
  queueNextUrl: 'https://yoursystem.com/api/queue/next',
  deleteFromQueueUrl: 'https://yoursystem.com/api/queue',
  statusMessage: 'Ready for next step'
}

pullFromQueue(options, (error, data) => {
  if (error) {
    console.error(error)
  } else {
    console.log(data)
  }
})
```

If no jobs in queue it returns

```javascript
{ message: 'No job in queue' }
```

else

```javascript
{ message: 'Job 56b79dc6139e6bf1069ae22d downloaded. Status updated.' }
```

## Docker

### Environment

Update docker.env

```
NODE_ENV=production
TFK_SQP_JWT_KEY=Louie Louie, oh no, I got to go. Louie Louie, oh no, I got to go
TFK_SQP_CALLBACK_STATUS_MESSAGE=Pending
TFK_SQP_JOB_DIRECTORY_PATH=test/data/jobs
TFK_SQP_COPIES_DIRECTORY_PATH=test/data/copies
TFK_SQP_QUEUE_NEXT_URL=https://example.com/api/queue/next
TFK_SQP_QUEUE_DELETE_URL=https://example.com/api/queue
```

### Build

Build

```sh
$ docker build -t tfk-saksbehandling-queue-pull .
```

### Usage

```sh
$ docker run --env-file=docker.env --volume=/test/data/jobs:/src/test/data/jobs --rm tfk-saksbehandling-queue-pull
```

This will start a container. Download a job. Stop the container and remove it.

## License

[MIT](LICENSE)

![Robohash image of tfk-saksbehandling-queue-pull](https://robots.kebabstudios.party/tfk-saksbehandling-queue-pulln.png "Robohash image of tfk-saksbehandling-queue-pull")