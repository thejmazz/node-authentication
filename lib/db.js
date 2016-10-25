'use strict'

const VendorSequelize = require('sequelize')
const retry = require('retry')

const { PG: { username, database, password, host } } = require('lib/config.js')

class Sequelize extends VendorSequelize {
  constructor(...args) {
    super(...args)
  }

  define(modelName, attributes, options) {
    return super.define(modelName, attributes, Object.assign({}, {
      underscored: true,
      freezeTableName: true
    }, options))
  }
}

const verifyDBConnection = (db) => new Promise((resolve, reject) => {
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

module.exports = {
  db: new Sequelize(database, username, password, {
    host,
    dialect: 'postgres',
    pool: {
      max: 5,
      min: 0,
      idle: 10000
    }
  }),
  verifyDBConnection
}
