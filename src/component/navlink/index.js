import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { TabBar } from 'antd-mobile'
import { withRouter } from 'react-router-dom'
@withRouter
class NavLinkBar extends Component {
  static propTypes = {
    data: PropTypes.array.isRequired
  }

  render() {

    const navList = this.props.data.filter(item => !item.hidden)
    const { pathname } = this.props.location
    return(
      <div>
        <TabBar>
          {navList.map(item => (
            <TabBar.Item
              title={item.title}
              key={item.path}
              icon={{uri: require(`./img/${item.icon}.png`)}}
              selectedIcon={{uri: require(`./img/${item.icon}-active.png`)}}
              selected={pathname === item.path}
              onPress={() => {
                this.props.history.push(item.path)
              }}
            ></TabBar.Item>
          ))}
        </TabBar>
      </div>
    )
  }
}

export default NavLinkBar
