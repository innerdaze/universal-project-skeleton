import React, { Component, PropTypes } from 'react'
import Menu from 'grommet/components/Menu'
import Button from 'grommet/components/Button'
import Anchor from 'grommet/components/Anchor'
import Header from 'grommet/components/Header'
import Heading from 'grommet/components/Heading'
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
      <Header
        direction='row'
        justify='center'>
        <Menu
          label='Change Mode'
          inline={true}
          direction='row'
          justify='between'
          size='small'
          flex='grow'
          responsive={false}>
          <Anchor
            label='Stocktake'
            onClick={this.onSwitch.bind(this, Modes.STOCKTAKE)}
            className={this.state.mode === Modes.STOCKTAKE && 'grommetux-anchor--primary'}/>
          <Anchor
            label='Order'
            onClick={this.onSwitch.bind(this, Modes.ORDERING)}
            className={this.state.mode === Modes.ORDERING && 'grommetux-anchor--primary'}/>
          <Anchor
            label='Delivery'
            onClick={this.onSwitch.bind(this, Modes.DELIVERY)}
            className={this.state.mode === Modes.DELIVERY && 'grommetux-anchor--primary'}/>
        </Menu>
      </Header>
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
