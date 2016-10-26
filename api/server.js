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

app.post('/login', (req, res) => {
  const { Users } = require('models/index.js')
  const bcrypt = {
    compare: require('bluebird').promisify(require('bcryptjs').compare)
  }

  const { email, password } = req.body

  Users.findOne({
    where: {
      email
    }
  }).then((user) => {
    if (user) {
      console.log(user)
      return bcrypt.compare(password, user.dataValues.password)
      // res.send({ success: false, message: 'WIP' })
    } else {
      throw new Error('no user')
    }
  }).then((matched) => {
    if (matched) {
      res.send({ success: true, message: 'Logged in' })
    } else {
      res.send({ success: false, message: 'Login failed' })
    }
  })
    .catch((err) => {
    if (err.message === 'no user') {
      res.send({ success: false, message: 'Login fail' })
    } else {
      console.error(err)
      res.status(500)
    }
  })
})

app.post('/signup', (req, res) => {
  const Promise = require('bluebird')
  const bcryptjs = require('bcryptjs')
  const bcrypt = {
    hash: Promise.promisify(bcryptjs.hash),
    genSalt: Promise.promisify(bcryptjs.genSalt)
  }
  const { Users } = require('models/index.js')

  const { email, password } = req.body

  // Check no user with same email already exists
  // Users.findOne({
  //   where: {
  //     email
  //   }
  // }).then((user) => {
  //     if (user) {
  //       res.send({ success: false, message: 'User account already exists' })
  //       throw new Error('user account already exists')
  //     }
  //   })

  Promise.resolve()
    .then(() => bcrypt.genSalt(10))
    .then(salt => bcrypt.hash(password, salt))
    .then(hash => Users.create({ email, password: hash }))
    .then(() => res.send({
      success: true,
      message: `User account ${email} created`
    }))
    .catch(err => {
      if (err.message === 'user account already exists') {
        return
      }

      if (err.name === 'SequelizeValidationError') {
        if (err.message === 'Validation error: Validation isEmail failed') {
          res.send({ success: false, message: 'Email validation failed' })
          return
        }
      } else if (err.name === 'SequelizeUniqueConstraintError') {
        res.send({ success: false, message: 'Email already exists' })
        return
      }

      throw err
    })
    .catch((err) => {
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
