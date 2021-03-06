const mongoose = require('mongoose')
const DB_URL = 'mongodb://localhost:27017/react'

mongoose.connect(DB_URL, {
  useMongoClient: true
})

mongoose.Promise = global.Promise
mongoose.connection.on('connected', () => {
  console.log('mongoose is ok!')
})

module.exports = mongoose
