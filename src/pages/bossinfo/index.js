import React, { Component } from 'react'
import { NavBar, InputItem, TextareaItem, Button } from 'antd-mobile'
import AvatarSelect from '@/component/avatar-select'
import { connect } from 'react-redux'
import { update } from '@/redux/user.js'
import { Redirect } from 'react-router-dom'

@connect(
  state => state.user,
  { update }
)
class BossInfo extends Component {
  constructor(props) {
    super(props)
    this.state = {
      title: '',
      company: '',
      money: '',
      desc: '',
      avatar: ''
    }
  }

  handleChange(key, value) {
    this.setState({
      [key]: value
    })
  }

  handleAvatar(text) {
    this.setState({
      avatar: text
    })
  }

  handleSubmit() {
    this.props.update(this.state)
  }

  render() {
    return (
      <div>
        { this.props.redirectTo !== this.props.location.pathname ? <Redirect to={this.props.redirectTo} /> : null }
        <NavBar mode="dark">BOSS完善信息页</NavBar>
        <AvatarSelect
          selectAvatar={text => this.handleAvatar(text)} />
        <InputItem onChange={(v) => this.handleChange('title', v)}>
          招聘职位
        </InputItem>
        <InputItem onChange={(v) => this.handleChange('company', v)}>
          公司名称
        </InputItem>
        <InputItem onChange={(v) => this.handleChange('money', v)}>
          职位薪资
        </InputItem>
        <TextareaItem
          title="职位要求"
          row={3}
          onChange={(v) => this.handleChange('desc', v)}
          autoHeight
        />
        <Button type='primary' onClick={e => this.handleSubmit()}>保存</Button>
      </div>
    )
  }
}

export default BossInfo
