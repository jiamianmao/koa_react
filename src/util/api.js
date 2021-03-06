import request from './request'

export function getUserInfo() {
  return request({
    url: '/user/info'
  })
}

export function toRegister(data) {
  return request({
    url: '/user/register',
    method: 'post',
    data
  })
}

export function toLogin(data) {
  return request({
    url: '/user/login',
    method: 'post',
    data
  })
}

export function toUpdate(data) {
  return request({
    url: '/user/update',
    method: 'post',
    data
  })
}

export function getUserList(type) {
  return request({
    url: `/user/list?type=${type}`
  })
}

export function getUserMsgList(chatId) {
  return request({
    url: `/user/msglist?chatId=${chatId}`
  })
}

export function toReadMsg(from) {
  return request({
    url: '/user/readmsg',
    method: 'post',
    data: { from }
  })
}