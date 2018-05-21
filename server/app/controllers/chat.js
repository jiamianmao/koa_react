const Chat = require('../models/chat')
const User = require('../models/user')

const msgList = async(ctx, next) => {
  let token = ctx.get('authorization').split(' ')[1]
  const { chatId } = ctx.request.query
  let query = chatId ? {
    'chatid': chatId
  } : {}
  try {
    let user = await User.findOne({'api_token': token})
    if (user) {
      let chats = await Chat.find(query)
      ctx.body = {
        code: 0,
        data: chats
      }
    }
  } catch(e) {
    console.log('error')
  }
}

const readMsg = async(ctx, next) => {
  let token = ctx.get('authorization').split(' ')[1]
  // console.log(ctx.request.body)
  const { from } = ctx.request.body
  try {
    let user = await User.findOne({'api_token': token})
    console.log(from, user._id)
    let result = await Chat.update({from, to: user._id}, {
      '$set': {
        read: true
      }
    }, {
      'multi': true
    })
    if (result) {
      ctx.body = {
        code: 0,
        num: result.nModified
      }
    } else {
      ctx.body = {
        code: 1,
        data: '修改失败'
      }
    }
  } catch(e) {

  }
  
}

module.exports = {
  msgList,
  readMsg
}
