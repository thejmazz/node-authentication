'use strict'

const retry = require('retry')
const _ = require('lodash')

const db = require('lib/db.js')
const models = require('models/index.js')

const verifyDBConnection = () => new Promise((resolve, reject) => {
  const operation = retry.operation({ retries: 10 })

  operation.attempt((n) => db.authenticate()
    .then(() => {
      console.log(`DB connected after ${n} attempt${n !== 1 ? 's' : ''}`)
      resolve(db)
    })
    .catch((err) => {
      console.log(`${n} attempt to connect to DB failed`)

      if (!operation.retry(err)) {
        reject(err)
      }
    })
  )
})

const syncModels = (models, opts) => Promise.all(models.map(model => model.sync(opts)))

module.exports = () =>
  verifyDBConnection()
  .then(() => syncModels(_.values(models)))
