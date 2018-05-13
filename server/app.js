const Koa = require('koa')
const PORT = process.env.PORT || 9527
// const router = require('./config/route')
const router = require('./router')
const bodyparser = require('koa-bodyparser')
const mongoose = require('mongoose')
const Chat = require('./app/models/chat')
const DB_URL = 'mongodb://localhost:27017/react'
const app = new Koa()
const server = require('http').createServer(app.callback())
const io = require('socket.io')(server)

io.on('connection', (socket) => {
  socket.on('sendmsg', async (data) => {
    console.log(data)
    const { from, to, msg } = data
    const chatid = [from, to].sort().join('_')
    let result = await Chat.create({
      chatid,
      from,
      to,
      content: msg
    })
    io.emit('reply', result)    
  })
})

// mongoose 5.x 不需要`useMongoClient`配置项，也不需要配置Promise了
mongoose.connect(DB_URL)

mongoose.Promise = global.Promise
mongoose.connection.on('connected', () => {
  console.log('mongoose is start!')
})

app.use(bodyparser())
app.use(router.routes()).use(router.allowedMethods())
server.listen(PORT, () => {
  console.log(`The server is starting at port ${PORT}!`)
})
