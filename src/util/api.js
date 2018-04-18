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

export function login(data) {
  return request({
    url: '/user/login',
    method: 'post',
    data
  })
}
