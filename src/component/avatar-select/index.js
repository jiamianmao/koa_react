import React from 'react'
import { Grid, List } from 'antd-mobile'
import PropTypes from 'prop-types'

class AvatarSelect extends React.Component {
  static propTypes = {
    selectAvatar: PropTypes.func
  }

  constructor(props) {
    super(props)
    this.state = {
      icon: ''
    }
  }


  handleClick(elm) {
    this.setState({
      icon: elm.icon
    })
    this.props.selectAvatar(elm.text)
  }

  render () {
    const avatarList = 'boy,girl,man,woman,bull,chick,crab,hedgehog,hippopotamus,koala,lemur,pig,tiger,whale,zebra'.split(',').map(item => ({
      icon: require(`../../assets/img/${item}.png`),
      text: item
    }))

    const gridHeader = this.state.icon ? (
      <div>
        <span>已选择头像</span>
        <img src={this.state.icon} style={{width: 20}} alt='' />
      </div>
    ) : '请选择头像'
    return (
      <div>
        <List renderHeader={() => gridHeader}>
          <Grid
            data={avatarList}
            columnNum={5}
            onClick={elm => this.handleClick(elm)}
          />
        </List>
      </div>
    )
  }
}

export default AvatarSelect
