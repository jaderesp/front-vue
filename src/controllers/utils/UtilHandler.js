const logger = require('pino')()

const { promisify } = require('util')
const { pipeline } = require('stream')
const pipelineAsync = promisify(pipeline)

module.exports = {
    logger,
    pipelineAsync,
    promisify
}