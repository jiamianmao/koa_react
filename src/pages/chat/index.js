import React, { Component } from 'react'
import { List, InputItem, NavBar, Icon, Grid } from 'antd-mobile'
import { connect } from 'react-redux'
import { sendMsg, getMsgList, replyMsg, readMsg } from '@/redux/chat'
import { getChatId } from '@/util/util'

@connect(
  state => state,
  { sendMsg, getMsgList, replyMsg, readMsg }
)
class Chat extends Component {
  constructor(props) {
    super(props)
    this.state = {
      text: '',
      emoji: false
    }
  }

  handleSubmit() {
    const from = this.props.user._id
    const to = this.props.match.params.user
    const msg = this.state.text
    this.props.sendMsg({ from, to, msg })
    this.setState({
      text: ''
    })
  }

  componentWillMount() {
    if (!this.props.chatuser.userList.length) {
      this.props.history.go(-1)
    }
    const chatId = getChatId(this.props.user._id, this.props.match.params.user)
    this.props.getMsgList(chatId)
  }

  componentWillUnmount() {
    const to = this.props.match.params.user
    this.props.readMsg(to)
  }

  handleChange(v) {
    this.setState({
      text: v
    })
  }

  handleClick() {
    this.setState({
      emoji: !this.state.emoji
    })
    this._repairAntdMobile()
  }

  handleEmoji({text}) {
    this.setState({
      text: this.state.text + text
    })
  }

  _repairAntdMobile() {
    setTimeout(() => {
      window.dispatchEvent(new Event('resize'))
    }, 0)
  }

  render() {
    const emoji = `😄 😃 😀 😊 😉 😍 😘 😚 😗 😙 😜 😝 😛 😳 😁 😔 😌 😒 😞 😣 😢 😂 😭 😪 😥 😰 😄 😃 😀 😊 😉 😍 😘 😚 😗 😙 😜 😝 😛 😳 😁 😔 😌 😒 😞 😣 😢 😂 😭 😪 😥 😰`
                  .split(' ')
                  .map(item => ({text: item}))
    
    const { user } = this.props.match.params
    const Item = List.Item
    const toChatUser = this.props.chatuser.userList.find(item => item._id === user)
    if (!toChatUser) {
      return null
    }
    const avatar = require(`../../assets/img/${toChatUser.avatar}.png`)
    const myAvatar = require(`../../assets/img/${this.props.user.avatar}.png`)
    return (
      <div id='chat-page'>
        <NavBar
          mode='dark'
          icon={<Icon type='left' />}
          onLeftClick={() => {
            this.props.history.go(-1)
          }}
        >
          { toChatUser.account }
        </NavBar>
        {this.props.chat.chatMsg.map(item => {
          return item.from === user ? (
            <List key={item._id}>
              <Item
                thumb={avatar}
              >{item.content}</Item>
            </List>
          ) : (
            <List key={item._id}>
              <Item
                extra={<img src={myAvatar} alt='' />}
                className='chat-me'
              >{item.content}</Item>
            </List>
          )
        })}
        <div className="stick-footer">
          <List>
            <InputItem
              placeholder='请输入'
              value={this.state.text}
              onChange={v => this.handleChange(v)}
              extra={
                <div>
                  <span onClick={() => this.handleClick()} style={{marginRight: 5}} role='img' aria-label='emoji'>😘</span>
                  <span onClick={() => this.handleSubmit()}>发送</span>
                </div>
              }
            ></InputItem>
          </List>
          { this.state.emoji ? <Grid
            data={emoji}
            isCarousel={true}
            carouselMaxRow={4}
            columnNum={9}
            onClick={text => this.handleEmoji(text)}
          /> : null }
          
        </div>
      </div>
    )
  }
}

export default Chat
