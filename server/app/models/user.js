const mongoose = require('mongoose')
const Schema = mongoose.Schema
const UserSchema = new Schema({
  'account': {
    type: String,
    unique: true
  },
  'password': String,
  'type': String,
  'api_token': {
    type: String,
    unique: true
  }
})

module.exports = mongoose.model('User', UserSchema)
