import React from 'react'
import Logo from '../../component/logo'
import { List, InputItem, WingBlank, WhiteSpace, Button, Radio } from 'antd-mobile'
import { connect } from 'react-redux'
import { register } from '@/redux/user'

@connect(
  state => state.user,
  { register }
)
class Register extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      account: '',
      password: '',
      repeatpwd: '',
      type: 'genuis'
    }
  }

  handleChange(key, value) {
    this.setState({
      [key]: value
    })
  }

  handleRegister() {
    this.props.register(this.state)
    // console.log(this.state)
  }

  render () {
    const { RadioItem } = Radio
    return (
      <div>
        <Logo />
        <List>
          <InputItem
            placeholder='请输入用户名'
            onChange={(v) => this.handleChange('account', v)}
          >用户名</InputItem>
          <InputItem
            type='password'
            placeholder='请输入密码'
            onChange={(v) => this.handleChange('password', v)}
          >密码</InputItem>
          <InputItem
            type='password'
            placeholder='请再次输入密码'
            onChange={(v) => this.handleChange('repeatpwd', v)}
          >确认密码</InputItem>
          <RadioItem    
            checked={this.state.type === 'genuis'}
            onChange={() => this.handleChange('type', 'genuis')}
          >
            牛人
          </RadioItem>
          <RadioItem
            checked={this.state.type === 'boss'}
            onChange={() => this.handleChange('type', 'boss')}
          >
            BOSS
          </RadioItem>
          <WhiteSpace />
          <WingBlank>
            <Button type='primary' onClick={e => this.handleRegister(e)}>注册</Button>
          </WingBlank>
        </List>
      </div>
    )
  }
}

export default Register
