const UserModel = require('../models/user')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

// findOne第一个参数是查询条件，第二个参数是字段操作符，形如 ：{field: Boolean}

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
      try {
        let hash = await bcrypt.hash(password, 10)
        let user = new UserModel({
          account,
          password: hash,
          type,
          api_token: createToken(account)
        })

        await user.save()

        ctx.body = {
          code: 0,
          msg: '恭喜您，注册成功!',
          info: user
        }
      } catch(e) {
        console.log(e)
      }
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
  
  const user = await UserModel.findOne({ account })
  
  if (user) {
    let matchPassword = await bcrypt.compare(password, user.password)

    if (matchPassword) {
      user.api_token = createToken(user._id)

      await user.save()
      ctx.body = {
        code: 0,
        msg: '登录成功',
        info: user
      }
    } else {
      ctx.body = {
        code: 1,
        msg: '登录失败'
      }
    }
  } else {
    ctx.body = {
      code: 1,
      msg: '账号不存在'
    }
  }
}

// 更新接口
const update = async(ctx, next) => {
  let token = ctx.get('authorization').split(' ')[1]
  let { avatar, company, desc, money, title } = ctx.request.body
  await UserModel.update({'api_token': token}, {
    $set: {
      avatar,
      company,
      desc,
      money,
      title
    }
  })
  let user = await UserModel.findOne({'api_token': token})
  if (user) {
    ctx.body = {
      code: 0,
      msg: '更新成功',
      info: user
    }
  } else {
    ctx.body = {
      code: 1,
      msg: 'token无效'
    }
  }
}

// 鉴权
const signinRequire = async(ctx, next) => {
  const Authorization = ctx.get('Authorization')
  if (!Authorization) {
    ctx.throw(401, 'no token')
  }
  const token = Authorization.split(' ')[1]
  try {
    await jwt.verify(token, 'spawn')
  } catch(e) {
    ctx.throw(401, 'invalid token')
  }

  await next()
}

// 用户列表
const userList = async(ctx, next) => {
  const { type } = ctx.request.query
  let result = await UserModel.find({type}, {password: false, __v: false, api_token: false})
  ctx.body = {
    code: 0,
    list: result
  }
}

// 用户个人信息
const userInfo = async(ctx, next) => {
  let token = ctx.get('authorization').split(' ')[1]
  let user = await UserModel.findOne({'api_token': token}, {'password': false})
  if (user) {
    ctx.body = {
      code: 0,
      data: user
    }
  } else {
    ctx.body = {
      code: 1,
      msg: 'token失效'
    }
  }
}

module.exports = {
  register,
  login,
  signinRequire,
  update,
  userList,
  userInfo
}
