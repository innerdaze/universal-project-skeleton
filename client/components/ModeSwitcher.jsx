import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Menu from 'grommet/components/Menu'
import Anchor from 'grommet/components/Anchor'
import Header from 'grommet/components/Header'
import Modes from '../constants/OperationModes'

class ModeSwitcher extends Component {
  constructor(props) {
    super(props)

    this.state = {
      mode: Modes.STOCKTAKE
    }
  }

  onSwitch(mode) {
    this.setState({
      mode: mode
    })

    this.props.onSwitch(mode)
  }

  render() {
    return (
      <Menu primary={true}>
        <Anchor
          label='Stocktake'
          onClick={this.onSwitch.bind(this, Modes.STOCKTAKE)}
          className={this.state.mode === Modes.STOCKTAKE && 'active'}
          />
        <Anchor
          label='Order'
          onClick={this.onSwitch.bind(this, Modes.ORDERING)}
          className={this.state.mode === Modes.ORDERING && 'active'}
          />
        <Anchor
          label='Delivery'
          onClick={this.onSwitch.bind(this, Modes.DELIVERY)}
          className={this.state.mode === Modes.DELIVERY && 'active'}
          />
      </Menu>
    )
  }
}

ModeSwitcher.propTypes = {
  onSwitch: PropTypes.func.isRequired
}

ModeSwitcher.defaultTypes = {
  onSwitch: Function.prototype
}

export default ModeSwitcher
