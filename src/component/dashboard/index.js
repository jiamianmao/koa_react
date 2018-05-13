import React, { Component } from 'react'
import { connect } from 'react-redux'
import { NavBar } from 'antd-mobile'
import { Switch, Route } from 'react-router-dom'
import NavLinkBar from '@/component/navlink'

import Boss from '@/pages/boss'
import Genius from '@/pages/genius'
import User from '@/pages/user'

function Msg() {
  return <h2>消息</h2>
}

@connect(
  state => state
)
class Dashboard extends Component {
  
  render() {
    const user = this.props.user
    const { pathname } = this.props.location
    const navList = [
      {
        path: '/boss',
        text: '牛人',
        icon: 'boss',
        title: '牛人列表',
        component: Boss,
        hidden: user.type === 'genius'
      }, {
        path: '/genius',
        text: 'BOSS',
        icon: 'job',
        title: 'BOSS列表',
        component: Genius,
        hidden: user.type === 'boss'
      }, {
        path: '/msg',
        text: '消息',
        icon: 'msg',
        title: '消息列表',
        component: Msg
      }, {
        path: '/me',
        text: '我',
        icon: 'user',
        title: '个人中心',
        component: User
      }
    ]
    const text = navList.find(item => item.path === pathname)
    return (
      <div>
        <NavBar className='fixd-header' mode="dark">{text ? text.title : null}</NavBar>
        <div style={{marginTop: 45, position: 'relative', zIndex: 1}}>
          <Switch>
            {navList.map(item => (
              <Route key={item.path} path={item.path} component={item.component}></Route>
            ))}
          </Switch>
        </div>
        <NavLinkBar data={navList}></NavLinkBar>
      </div>
    )
  }
}

export default Dashboard
