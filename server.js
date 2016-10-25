'use strict'

const express = require('express')

const { PORT } = require('lib/config.js')
const globalMiddlewares = require('lib/global-middlewares.js')
const db = require('lib/db.js')
const initializeDb = require('lib/initialize-db.js')

// Initialize application
const app = express()

// Apply global middlewares
globalMiddlewares.map(mw => app.use(mw))

// Apply routes
app.get('/', (req, res) => res.send('Hello world\n'))

app.post('/signup', (req, res) => {
  const Promise = require('bluebird')
  const bcryptjs = require('bcryptjs')
  const bcrypt = {
    hash: Promise.promisify(bcryptjs.hash),
    genSalt: Promise.promisify(bcryptjs.genSalt)
  }
  const { Users } = require('models/index.js')

  const { email, password } = req.body

  bcrypt.genSalt(10)
    .then(salt => bcrypt.hash(password, salt))
    .then(hash => Users.create({ email, password: hash }))
    .then(() => res.send({
      success: true,
      message: `User account ${email} created`
    }))
    .catch(err => {
      console.error(err)
      res.status(500)
    })
})

// Listen once everything ready
Promise.all([
  initializeDb()
])
  .then(() => {
    app.listen(PORT)
    console.log(`App listening on ${PORT}`)
  })
  .catch((err) => {
    console.log('ERROR: ', err)
    console.log('Exiting')
    process.exit(1)
  })
