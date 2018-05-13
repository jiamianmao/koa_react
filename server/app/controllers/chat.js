const Chat = require('../models/chat')
const User = require('../models/user')

const msgList = async(ctx, next) => {
  let token = ctx.get('authorization').split(' ')[1]
  try {
    let user = await User.findOne({'api_token': token})
    if (user) {
      let chats = await Chat.find({'$or': [{'from': user._id}, {'to': user._id}]})
      ctx.body = {
        code: 0,
        data: chats
      }
    }
  } catch(e) {
    console.log('error')
  }
}

module.exports = {
  msgList
}
