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
  },
  'avatar': String,
  'desc': String,
  'title': String,
  'company': String,
  'money': String,
  'chat': {
    'chatid': {
      type: String,
      require: true
    },
    'from': {
      type: String,
      require: true
    },
    'to': {
      type: String,
      require: true
    },
    'read': {
      type: Boolean,
      default: false
    },
    'content': {
      type: String,
      require: true,
      default: ''
    },
    'create_time': {
      type: Number,
      default: +new Date()
    }
  }
})

module.exports = mongoose.model('User', UserSchema)
