'use strict'

const Sequelize = require('sequelize')
const db = require('lib/db.js')

const Users = db.define('users', {
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
    // see: http://docs.sequelizejs.com/en/2.0/docs/models-definition/#validations
    validate: {
      isEmail: true
    }
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false
  }
})

module.exports = {
  Users
}
