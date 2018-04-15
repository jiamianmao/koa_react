const Router = require('koa-router')
const user = require('./user')
const router = new Router()

router.use('/api', user.routes(), user.allowedMethods())

module.exports = router
