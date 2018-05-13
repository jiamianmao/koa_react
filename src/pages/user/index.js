import React from 'react'
import { connect} from 'react-redux'
import { Result, List, WhiteSpace, Modal } from 'antd-mobile'
import { toLogout } from '@/redux/user'
import { Redirect } from 'react-router-dom'

@connect(
  state => state,
  { toLogout }
)
class User extends React.Component {

  handleClick() {
    Modal.alert('贤弟', '你真的要退出咯?', [
      { text: '贤弟不敢', onPress: () => console.log('cancel'), style: 'default'},
      { text: '哼,就退', onPress: () => {
        this.props.toLogout()
      }}
    ])
  }

  render() {
    const user = this.props.user
    const Item = List.Item
    const Brief = Item.Brief
    return (
      <div>
        {user.redirectTo === '/' ? (<Redirect to={user.redirectTo}></Redirect>) : null}
        {user.avatar ? (
          <Result
            img={
              <img src={require(`../../assets/img/${user.avatar}.png`)} style={{width: 50}} alt='' />
            }
            title={user.account}
            message={user.type === 'boss' ? user.company : null}
          />) : null
        }
        {user.title ? (
          <List renderHeader={() => '简介'}>
            <Item>
              {user.title}
              <Brief>{user.desc.split('\n').map((item, index) => (
                <div key={index}>{item}</div>
              ))}</Brief>
              {user.money ? <Brief>薪资: {user.money}</Brief> : null}
            </Item>
          </List>
        ) : null}
        <WhiteSpace></WhiteSpace>
        <List>
          <Item onClick={() => this.handleClick()}>退出登录</Item>
        </List>
      </div>
    )
  }
}

export default User
