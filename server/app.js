const Koa = require('koa')
const PORT = process.env.PORT || 9527
// const router = require('./config/route')
const router = require('./router')
const bodyparser = require('koa-bodyparser')
// const db = require('./config.db')
const mongoose = require('mongoose')
const DB_URL = 'mongodb://localhost:27017/react'
const app = new Koa()

// mongoose 5.x 不需要`useMongoClient`配置项，也不需要配置Promise了
mongoose.connect(DB_URL)

mongoose.Promise = global.Promise
mongoose.connection.on('connected', () => {
  console.log('mongoose is start!')
})

app.use(bodyparser())
app.use(router.routes()).use(router.allowedMethods())
app.listen(PORT, () => {
  console.log(`The server is starting at port ${PORT}!`)
})
