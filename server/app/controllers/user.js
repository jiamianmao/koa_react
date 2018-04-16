const UserModel = require('../models/user')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const register = async(ctx, next) => {
  const { account, password, type } = ctx.request.body

  const reg = /\w{4,14}/
  if (reg.test(account) && reg.test(password)) {
    const result = await UserModel.findOne({account})
    if (result) {
      ctx.body = {
        code: 1,
        msg: '账号已存在'
      }
    } else {
      bcrypt.hash(password, 10, async(err, hash) => {
        // Store hash in your password DB
        let user = new UserModel({
          account,
          password: hash,
          type,
          api_token: Math.random()
        })
        await user.save()

        ctx.body = {
          code: 0,
          msg: '恭喜您,注册成功!'
        }
      })
    }
  } else {
    ctx.body = {
      code: 1,
      msg: '账号密码不符合规范'
    }
  }
}

module.exports = {
  register
}
