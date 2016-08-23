###########################################################
#
# Dockerfile for tfk-saksbehandling-queue-pull
#
###########################################################

# Setting the base to nodejs 4.5.0
FROM mhart/alpine-node:4.5.0

# Maintainer
MAINTAINER Geir Gåsodden

#### Begin setup ####

# Installs git
RUN apk add --update --no-cache git

# Bundle app source
COPY . /src

# Change working directory
WORKDIR "/src"

# Install dependencies
RUN npm install --production

# Env variables
ENV TFK_SQP_JWT_KEY Louie Louie, oh no, I got to go. Louie Louie, oh no, I got to go
ENV TFK_SQP_CALLBACK_STATUS_MESSAGE "Til behandling"
ENV TFK_SQP_JOB_DIRECTORY_PATH test/data/jobs
ENV TFK_SQP_QUEUE_NEXT_URL https://example.com/api/queue/next
ENV TFK_SQP_QUEUE_DELETE_URL https://example.com/api/queue

# Startup
ENTRYPOINT node example.js