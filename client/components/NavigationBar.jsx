import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Menu from 'grommet/components/Menu'
import Anchor from 'grommet/components/Anchor'
import Footer from 'grommet/components/Footer'

export default class NavigationBar extends Component {

  render() {
    return (
      <Footer primary appCentered>
        <Menu
          inline
          direction="row"
          responsive={false}
          fill
          >
          <Link to="/orders">Orders</Link>
        </Menu>
      </Footer>
    )
  }

}
