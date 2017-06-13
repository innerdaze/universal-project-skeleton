import React, { Component } from 'react'
import Menu from 'grommet/components/Menu'
import Anchor from 'grommet/components/Anchor'

export default ({ handleLogoutPress = Function.prototype }) => (
  <Menu>
    <Anchor
      label='Logout'
      onClick={handleLogoutPress}
      />
  </Menu>
)
