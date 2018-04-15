import { toRegister } from '@/util/api'
const REGISTRT_SUCCESS = 'REGISTRT_SUCCESS'
const ERROR_MSG = 'ERROR_MSG'

const initState = {
  isAuth: false,
  msg: '',
  account: '',
  password: '',
  type: ''
}
// reducer
export function user(state = initState, action) {
  switch(action.type) {
    case REGISTRT_SUCCESS:
      return {...state, msg: '', isAuth: true, ...action.payload}
    case ERROR_MSG:
      return {...state, isAuth: false, msg: action.msg}
    default:
      return state
  }
}

const errorMsg = msg => {
  return {
    type: ERROR_MSG,
    msg
  }
}

const registerSuccess = data => {
  return {
    type: REGISTRT_SUCCESS,
    payload: data
  }
}

export function register({account, password, repeatpwd, type}) {
  if (!account || !password) {
    return errorMsg('用户名密码必须输入')
  }
  if (password !== repeatpwd) {
    return errorMsg('密码和确认密码不同')
  }
  return dispatch => {
    toRegister({ account, password, type}).then(res => {
      if (res.code === 0) {
        dispatch(registerSuccess({account, password, type}))
      } else {
        dispatch(errorMsg(res.msg))
      }
    })
  }
}
