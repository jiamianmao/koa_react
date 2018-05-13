import React from 'react'
import Logo from '@/component/logo'
import { List, InputItem, WingBlank, WhiteSpace, Button } from 'antd-mobile'
import { connect } from 'react-redux'
import { login } from '@/redux/user'
import { Redirect } from 'react-router-dom'

function WrapperHello(Com) {
  class WrapComp extends React.Component {
    render() {
      return (
        <div>
          <p>我是，，，Mr Right</p>
          <Com {...this.props}></Com>
        </div>
      )
    }
  }

  return WrapComp
}

@WrapperHello
class Hello extends React.Component {
  render() {
    return <h2>Hello world!</h2>
  }
}

// Hello = WrapperHello(Hello)

@connect(
  state => state.user,
  { login }
)
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
    this.props.login(this.state)
  }
  render () {
    return (
      <div className='container'>
        {this.props.redirectTo ? <Redirect to={this.props.redirectTo} /> : null}        
        <Logo />
        <Hello></Hello>
        <h2>登录页</h2>
        <WingBlank>
          <List>
            <InputItem onChange={v => this.handleInput(v, 'account')}>用户</InputItem>
            <InputItem type='password' onChange={v => this.handleInput(v, 'password')}>密码</InputItem>
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
