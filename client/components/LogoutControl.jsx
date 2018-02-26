import React from 'react'
import PropTypes from 'prop-types'
import Menu from 'grommet/components/Menu'
import Anchor from 'grommet/components/Anchor'

const LogoutControl = ({ handleLogoutPress = Function.prototype }) => (
  <Menu primary>
    <Anchor
      label='Logout'
      onClick={handleLogoutPress}
      />
  </Menu>
)

LogoutControl.propTypes = {
  handleLogoutPress: PropTypes.func.isRequired
}

export default LogoutControl
