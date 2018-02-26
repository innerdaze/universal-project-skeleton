import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Menu from 'grommet/components/Menu'
import Footer from 'grommet/components/Footer'

export default class NavigationBar extends Component {

  render() {
    return (
      <Footer primary appCentered>
        <Menu
          inline
          fill
          direction='row'
          responsive={false}
          >
          <Link to='/orders'>Orders</Link>
        </Menu>
      </Footer>
    )
  }

}
