'use strict'

const express = require('express')

const config = require('./lib/config.js')
const { global: globalMiddlewares } = require('./lib/middlewares.js')
const { db, verifyDBConnection } = require('./lib/db.js')(config)

// Initialize application
const app = express()

// Apply global middlewares
globalMiddlewares.map(mw => app.use(mw))

// Apply routes
app.get('/', (req, res) => res.send('Hello world\n'))

// Verified required services are functional
const requiredServices = [
  verifyDBConnection(db)
]

// Listen once everything ready
Promise.all(requiredServices)
  .then(() => {
    app.listen(config.PORT)
    console.log(`App listening on ${config.PORT}`)
  })
  .catch((err) => {
    console.log('ERROR: ', err)
    console.log('Exiting')
    process.exit(1)
  })
