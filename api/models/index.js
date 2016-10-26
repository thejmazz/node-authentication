'use strict'

const Sequelize = require('sequelize')
const db = require('lib/db.js')

const Users = db.define('users', {
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
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
