import io from 'socket.io-client'
import { getUserMsgList } from '@/util/api'
const socket = io('ws://localhost:9527')

// 获取聊天列表
const MSG_LIST = 'MSG_LIST'
// 读取信息
const MSG_REPLY  = 'MSG_REPLY'
// 标识已读
const MSG_READ = 'MSG_READ'

// action
const initState = {
  chatMsg: [],
  unread: 0
}

const msgList = msgs => {
  return {
    type: MSG_LIST,
    payload: msgs
  }
}

const msgReply = msg => {
  return {
    type: MSG_REPLY,
    payload: msg
  }
}

// reducer
export function chat(state = initState, action) {
  switch(action.type) {
    case MSG_LIST:
      return { ...state, chatMsg: action.payload, unread: action.payload.filter(item => !item.read).length }
    case MSG_REPLY:
      return { ...state, chatMsg: [...state.chatMsg, action.payload]}
    // case MSG_READ:
    default:
      return state
  }
}

export function replyMsg() {
  return dispatch => {
    socket.on('reply', data => {
      console.log('reply', data)
      dispatch(msgReply(data))
    })
  }
}

export function getMsgList() {
  return dispatch => {
    getUserMsgList().then(res => {
      dispatch(msgList(res.data))
    })
  }
}

export function sendMsg({from, to, msg}) {
  return dispatch => {
    socket.emit('sendmsg', { from, to, msg})
  }
}
