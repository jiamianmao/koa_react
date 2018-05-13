import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { getUserInfo } from '@/util/api'
import { connect } from 'react-redux'
import { authSuccess } from '@/redux/user'
import { Redirect } from 'react-router-dom'

@connect(
  state => state.user,
  { authSuccess }
)
@withRouter
class Auth extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  componentDidMount() {
    const publicList = ['/login', '/register']
    const { pathname } = this.props.location
    if (publicList.includes(pathname)) {
      return
    }

    getUserInfo().then(res => {
      this.props.authSuccess(res.data)
    }).catch(e => {
      this.props.history.push('/login')
    })
  }

  render() {
    const el = this.props.redirectTo ? <Redirect to={this.props.redirectTo}></Redirect> : null
    return (
      <div>{el}</div>
    )
  }
}
 
export default Auth;