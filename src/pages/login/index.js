import React from 'react'
import Logo from '../../component/logo'
import { List, InputItem, WingBlank, WhiteSpace, Button } from 'antd-mobile'
import { login } from '@/util/api'
class Login extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      account: '',
      password: ''
    }
  }

  handleInput(v, k) {
    this.setState({
      [k]: v
    })
  }

  register() {
    this.props.history.push('/register')
  }

  login() {
    login(this.state).then(res => {
      console.log(res)
    })
  }
  render () {
    return (
      <div>
        <Logo />
        <h2>登录页</h2>
        <WingBlank>
          <List>
            <InputItem onChange={v => this.handleInput(v, 'account')}>用户</InputItem>
            <InputItem onChange={v => this.handleInput(v, 'password')}>密码</InputItem>
          </List>
          <WhiteSpace />          
          <Button type='primary' onClick={() => this.login()}>登录</Button>
          <WhiteSpace />
          <Button onClick={() => this.register()} type='primary'>注册</Button>          
        </WingBlank>
      </div>
    )
  }
}

export default Login
