import React, { Component } from 'react'
import { connect} from 'react-redux'
import { getMsgList } from '@/redux/chat'
import { List, Badge } from 'antd-mobile'

@connect(
  state => state,
  { getMsgList }
)
class Msg extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount() {
    this.props.getMsgList()
  }

  getLast(item) {
    return item[item.length - 1]
  }

  handleClick(item) {
    console.log(item)
  }

  render() {
    const Item = List.Item
    const Brief = Item.Brief
    const msgGroup = {}
    this.props.chat.chatMsg.forEach(item => {
      msgGroup[item.chatid] = msgGroup[item.chatid] || []
      msgGroup[item.chatid].push(item)
    })
    const chatList = Object.values(msgGroup).sort((a, b) => {
      let a_last = this.getLast(a).create_time
      let b_last = this.getLast(b).create_time
      return b_last - a_last
    })
    
    const userId = this.props.user._id
    return (
      <div>
        <List>
          {chatList.map(item => {
            const lastItem = this.getLast(item)
            const targetId = lastItem.from === userId ? lastItem.to : lastItem.from
            const userInfo = [...this.props.chatuser.userList, this.props.user]
            const unreadNum = item.filter(v => !v.read && v.to === userId).length
            return (
            <Item
              extra={<Badge text={unreadNum}></Badge>}
              key={item[0].create_time}
              thumb={require(`../../assets/img/${userInfo.filter(v => v._id === targetId)[0].avatar}.png`)}
              onClick={() => {
                this.props.history.push(`/chat/${targetId}`)
              }}
            >
              {lastItem.content}
              <Brief>{userInfo.filter(v => v._id === targetId)[0].account}</Brief>
            </Item>
          )})}
        </List>
      </div>
    )
  }
}

export default Msg
