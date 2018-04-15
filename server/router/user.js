const Router = require('koa-router')
const User = require('../app/controllers/user')
const api = new Router()
const router = new Router()

// 用户信息
api.get('/user/info', ctx => {
  ctx.body = {
    code: 1,
    message: 'ok'
  }
})

api.post('/register', User.register)

router.use('/user', api.routes(), api.allowedMethods())

module.exports = router
