import React, { Component } from 'react'
import { WingBlank, WhiteSpace, Card } from 'antd-mobile'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'

@withRouter
class UserCard extends Component {
  static propTypes = {
    list: PropTypes.array
  }

  handleChat(id) {
    this.props.history.push(`chat/${id}`)
  }

  render() {
    return (
      <WingBlank>
        <WhiteSpace size="lg" />
        {this.props.list.map((item, index) => (
          item.avatar ? (
            <Card
              key={index}
              onClick={() => this.handleChat(item._id)}
            >
              <Card.Header
                title={item.account}
                thumb={require(`../../assets/img/${item.avatar}.png`)}
                extra={<span>{item.title}</span>}
              ></Card.Header>
              <Card.Body>
                {item.type === 'boss' ? <div>公司: {item.company}</div> : null}
                {item.desc.split('\n').map(item => (
                  <div key={item}>{item}</div>
                ))}
                {item.type === 'boss' ? <div>薪资: {item.money}</div> : null}
              </Card.Body>
            </Card>) : null
        ))}
      </WingBlank>
    )
  }
}

export default UserCard
