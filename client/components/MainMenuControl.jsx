import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Button from 'grommet/components/Button'
import MenuIcon from 'grommet/components/icons/base/Menu'

class MainMenuControl extends Component {
  constructor(props) {
    super(props)

    this.handleShowMenuClick = this.handleShowMenuClick.bind(this)
  }

  handleShowMenuClick() {
    this.props.showMenu()
  }

  render() {
    return (
      <Button
        plain
        icon={<MenuIcon/>}
        onClick={this.handleShowMenuClick}
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
