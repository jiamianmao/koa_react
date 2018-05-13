import React from 'react'
import { connect } from 'react-redux'
import { UserLists } from '@/redux/chatuser'
import UserCard from '@/component/userCard'

@connect (
  state => state.chatuser,
  { UserLists }
)
class Genius extends React.Component {
  componentDidMount() {
    this.props.UserLists('boss')
  }

  render() {
    return(
      <UserCard list={this.props.userList}></UserCard>
    )
  }

}

export default Genius
