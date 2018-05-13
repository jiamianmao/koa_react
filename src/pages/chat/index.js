import React, { Component } from 'react'
import { List, InputItem, NavBar } from 'antd-mobile'
import { connect } from 'react-redux'
import { getMsgList, sendMsg, replyMsg } from '@/redux/chat'

@connect(
  state => state,
  { getMsgList, sendMsg, replyMsg }
)
class Chat extends Component {
  constructor(props) {
    super(props)
    this.state = {
      text: ''
    }
  }

  componentDidMount() {
    this.props.getMsgList()
    this.props.replyMsg()
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

  handleChange(v) {
    this.setState({
      text: v
    })
  }

  render() {
    const { user } = this.props.match.params
    const Item = List.Item
    return (
      <div id='chat-page'>
        <NavBar mode='dark'>
          { user }
        </NavBar>
        {this.props.chat.chatMsg.map(item => {
          return item.from === user ? (
            <List key={item._id}>
              <Item
              >{item.content}</Item>
            </List>
          ) : (
            <List key={item._id}>
              <Item
              extra={'avatar'}
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
              extra={<span onClick={() => this.handleSubmit()}>发送</span>}
            ></InputItem>
          </List>
        </div>
      </div>
    )
  }
}

export default Chat
