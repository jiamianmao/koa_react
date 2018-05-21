import io from 'socket.io-client'
import { getUserMsgList, toReadMsg } from '@/util/api'
const socket = io('ws://localhost:9527')

// 获取聊天列表
const MSG_LIST = 'MSG_LIST'
// 读取信息
const MSG_REPLY  = 'MSG_REPLY'
// 标识已读
const MSG_READ = 'MSG_READ'

function getUnread(arr=[], id) {
  return arr.filter(v => !v.read && v.to === id).length
}

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

const msgReply = (msg, userId) => {
  return {
    type: MSG_REPLY,
    payload: msg,
    userId
  }
}

const msgRead = ({from, userId, num}) => {
  return {
    type: MSG_READ,
    payload: {
      from,
      userId,
      num
    }
  }
}
// reducer
export function chat(state = initState, action) {
  switch(action.type) {
    case MSG_LIST:
      return { ...state, chatMsg: action.payload.data, unread: getUnread(action.payload.data, action.payload.id) }
    case MSG_REPLY:
      const n = action.payload.to === action.userId ? 1 : 0
      return { ...state, chatMsg: [...state.chatMsg, action.payload], unread: state.unread + n }
    case MSG_READ:
      const { from, num } = action.payload
      return {...state, chatMsg: state.chatMsg.map(v => ({...v, read: from === v.from ? true : v.read})), unread: state.unread - num}
    default:
      return state
  }
}

export function replyMsg() {
  return (dispatch, getState) => {
    socket.on('reply', data => {
      dispatch(msgReply(data, getState().user._id))
    })
  }
}

export function getMsgList(chatId) {
  const id = chatId || ''
  return (dispatch, getState) => {
    getUserMsgList(id).then(res => {
      dispatch(msgList({
        data: res.data,
        id: getState().user._id
      }))
    })
  }
}

export function sendMsg({from, to, msg}) {
  return dispatch => {
    socket.emit('sendmsg', { from, to, msg})
  }
}

export function readMsg(from) {
  return (dispatch, getState) => {
    toReadMsg(from).then(res => {
      const userId = getState().user._id
      dispatch(msgRead({from, userId, num: res.num}))
    })
  }
}
