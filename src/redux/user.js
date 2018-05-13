import { toRegister, toLogin, toUpdate } from '@/util/api'
import { getRedireactPath } from '@/util/util'
import Storage from 'good-storage'
const ERROR_MSG = 'ERROR_MSG'
const AUTH_SUCCESS = 'AUTH_SUCCESS'
const LOGOUT = 'LOGOUT'
const LOAD_DATA = 'LOAD_DATA'

const initState = {
  redirectTo: '',
  msg: '',
  account: '',
  password: '',
  type: ''
}
// reducer
export function user(state = initState, action) {
  switch(action.type) {
    // 这种是函数式编程常用手段
    case AUTH_SUCCESS:
      return {...state, msg: '', redirectTo: getRedireactPath(action.payload), ...action.payload}
    case ERROR_MSG:
      return {...state, isAuth: false, msg: action.msg}
    case LOGOUT:
      return { ...state, redirectTo: '/login' }
    case LOAD_DATA:
      return { ...state, ...action.payload}
    default:
      return state
  }
}

// 相当于action的工厂函数
const errorMsg = msg => {
  return {
    type: ERROR_MSG,
    msg
  }
}

export const authSuccess = data => {
  return {
    type: AUTH_SUCCESS,
    payload: data
  }
}

export function loadData(payload) {
  return { type: LOAD_DATA, payload }
}

export function toLogout() {
  Storage.remove('token')
  return { type: LOGOUT }
}

// 登录
export function login({account, password}) {
  if (!account || !password) {
    return errorMsg('用户名密码必须输入')
  }

  return dispatch => {
    toLogin({account, password}).then(res => {
      if (res.code === 0) {
        Storage.set('token', res.info.api_token)
        dispatch(authSuccess(res.info))
      } else {
        dispatch(errorMsg(res.msg))
      }
    })
  }
}

// 注册
export function register({account, password, repeatpwd, type}) {
  if (!account || !password) {
    return errorMsg('用户名密码必须输入')
  }
  if (password !== repeatpwd) {
    return errorMsg('密码和确认密码不同')
  }
  // reudx-thunk 可以使得reducer接收一个函数,之前的reducer只能接收一个对象
  return dispatch => {
    toRegister({ account, password, type }).then(res => {
      if (res.code === 0) {
        Storage.set('token', res.info.api_token)
        dispatch(authSuccess({account, password, type}))
      } else {
        dispatch(errorMsg(res.msg))
      }
    })
  }
}

// 更新
export function update(data) {
  return dispatch => {
    toUpdate(data).then(res => {
      if (res.code === 0) {
        const { avatar, type } = res.info
        dispatch(authSuccess({ avatar, type }))
      } else {
        dispatch(errorMsg(res.msg))
      }
    })
  }
}
