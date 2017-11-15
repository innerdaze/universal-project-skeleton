import React from 'react'
import PropTypes from 'prop-types'
import Menu from 'grommet/components/Menu'
import Anchor from 'grommet/components/Anchor'

const ReinitializeControl = ({ handleReinitializePress = Function.prototype }) => (
  <Menu primary>
    <Anchor
      label='Reconfigure'
      onClick={handleReinitializePress}
      />
  </Menu>
)

ReinitializeControl.propTypes = {
  handleReinitializePress: PropTypes.func.isRequired
}

export default ReinitializeControl
