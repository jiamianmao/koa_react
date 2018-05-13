import { getUserList } from '@/util/api'

const USER_LIST = 'USER_LIST'

const initState = {
  userList: []
}

export function chatuser(state = initState, action) {
  switch(action.type) {
    case USER_LIST:
      return { ...state, userList: action.payload }
    default:
      return state
  }
}

function userList(data) {
  return {
    type: USER_LIST,
    payload: data
  }
}

export function UserLists(type) {
  return dispatch => {
    getUserList(type).then(res => {
      dispatch(userList(res.list))
    })
  }
}
