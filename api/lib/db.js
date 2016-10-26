'use strict'

const VendorSequelize = require('sequelize')

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

module.exports = new Sequelize(database, username, password, {
  host,
  dialect: 'postgres',
  pool: {
    max: 5,
    min: 0,
    idle: 10000
  }
})
