const UserModel = require('../models/user')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

// 生成token
const createToken = (userId) => {
  const token = jwt.sign({
    userId
  }, 'spawn', {
    expiresIn: '2h'
  })

  return token
}

// 注册接口
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

// 登录接口
const login = async(ctx, next) => {
  const { account ,password } = ctx.request.body
  
  const user = await UserModel.findOne({account})
  
  if (user) {
    let matchPassword = await bcrypt.compare(password, user.password)
    
    if (matchPassword) {
      user.api_token = createToken(user._id)

      await user.save()

      ctx.body = {
        status: '0',
        msg: '登录成功',
        api_token: user.api_token
      }

    } else {
      ctx.body = {
        status: '1',
        msg: '登录失败'
      }
    }
  } else {
    ctx.body = {
      status: '1',
      msg: '账号不存在'
    }
  }
}

module.exports = {
  register,
  login
}
