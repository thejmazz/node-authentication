'use strict'

const Sequelize = require('sequelize')
const db = require('lib/db.js')

const Users = db.define('users', {
  email: { type: Sequelize.STRING },
  password: { type: Sequelize.STRING }
})

module.exports = {
  Users
}
