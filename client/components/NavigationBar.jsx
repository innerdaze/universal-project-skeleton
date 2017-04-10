import React, { Component } from 'react'
import { Link } from 'react-router'
import Menu from 'grommet/components/Menu'
import Anchor from 'grommet/components/Anchor'
import Footer from 'grommet/components/Footer'

export default class NavigationBar extends Component {

  render() {
    return (
      <Footer primary={true} appCentered={true}>
        <Menu
          inline={true}
          direction='row'
          responsive={false}
          fill={true}>
          <Link to="/orders">Orders</Link>
        </Menu>
      </Footer>
    )
  }

}
