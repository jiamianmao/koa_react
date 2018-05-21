const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ChatSchema = new Schema({
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
    default: new Date().getTime()
  }
})

module.exports = mongoose.model('Chat', ChatSchema)
