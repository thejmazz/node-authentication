'use strict'

const cors = require('cors')
const bodyParser = require('body-parser')
const morgan = require('morgan')

module.exports = {
  global: [
    cors(),
    morgan('dev'),
    bodyParser.json(),
    bodyParser.urlencoded({ extended: true })
  ]
}
