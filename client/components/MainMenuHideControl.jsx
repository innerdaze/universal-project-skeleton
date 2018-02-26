import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Menu from 'grommet/components/Menu'
import Button from 'grommet/components/Button'
import CloseIcon from 'grommet/components/icons/base/Close'

class MainMenuHideControl extends Component {
  constructor(props) {
    super(props)

    this.handleHideMenuClick = this.handleHideMenuClick.bind(this)
  }

  handleHideMenuClick() {
    this.props.hideMenu()
  }

  render() {
    return (
      <Menu
        inline
        direction='row'
        responsive={false}
        alignSelf='end'
        >
        <Button
          plain
          icon={<CloseIcon/>}
          onClick={this.handleHideMenuClick}
          />
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
