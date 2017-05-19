import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Menu from 'grommet/components/Menu'
import Button from 'grommet/components/Button'
import CloseIcon from 'grommet/components/icons/base/Close'

class MainMenuHideControl extends Component {
  constructor(props) {
    super(props)

    this.hideMenu = this.hideMenu.bind(this)
  }

  hideMenu() {
    this.props.hideMenu()
  }

  render() {
    return (
      <Menu direction='row'
        responsive={false}
        inline={true}
        alignSelf='end'>
        <Button plain={true}
          icon={<CloseIcon/>}
          onClick={this.hideMenu} />
      </Menu>
    )
  }
}

MainMenuHideControl.propTypes = {
  hideMenu: PropTypes.func.isRequired
}

MainMenuHideControl.defaultProps = {
  hideMenu: Function.prototype
}

export default MainMenuHideControl
