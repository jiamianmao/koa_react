import React, { Component } from 'react'
import { getUserInfo } from '@/util/api'
import { withRouter } from 'react-router-dom'
@withRouter
class Auth extends Component {
  constructor(props) {
    super(props);
    this.state = {  }
  }

  componentDidMount() {
    const publicList = ['/login', '/register']
    const { pathname } = this.props.location
    if (publicList.includes(pathname)) {
      return
    }
    // 是否登录
    getUserInfo().then(res => {
      const { code } = res
      if (code === 0) {
        // 登录
      } else {
        this.props.history.push('/login')
      }
    })

    // 现在的URL地址
    // 用户的身份
    // 用户是否完善信息 (选择头像 个人简介)
  }

  render() { 
    return (
      <div>这是一个Auth页</div>
    )
  }
}
 
export default Auth;