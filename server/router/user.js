const Router = require('koa-router')
const User = require('../app/controllers/user')
const Chat = require('../app/controllers/chat')
const api = new Router()
const router = new Router()

api.post('/register', User.register)
api.post('/login', User.login)
api.post('/update', User.signinRequire, User.update)
api.get('/list', User.userList)
api.get('/info', User.userInfo)
api.get('/msglist', Chat.msgList)
api.post('/readmsg', Chat.readMsg)

router.use('/user', api.routes(), api.allowedMethods())

module.exports = router
