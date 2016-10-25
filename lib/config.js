'use strict'

// Load key=val pairs from .env into process.env
require('dotenv').config()

module.exports = {
  PORT: process.env.API_PORT,
  PG: {
    database: process.env.PGDATABASE,
    username: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    host: process.env.PGHOST
  }
}
