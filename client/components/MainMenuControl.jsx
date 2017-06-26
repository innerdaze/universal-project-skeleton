import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Button from 'grommet/components/Button'
import MenuIcon from 'grommet/components/icons/base/Menu'

class MainMenuControl extends Component {
  constructor(props) {
    super(props)

    this.showMenu = this.showMenu.bind(this)
  }

  showMenu() {
    this.props.showMenu()
  }

  render() {
    return (
      <Button
        plain
        icon={<MenuIcon/>}
        onClick={this.showMenu}
        />
    )
  }
}

MainMenuControl.propTypes = {
  showMenu: PropTypes.func.isRequired
}

MainMenuControl.defaultProps = {
  showMenu: Function.prototype
}

export default MainMenuControl
