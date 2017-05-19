import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Title from 'grommet/components/Title'
import modes from '../constants/OperationModes'
import modeNames from '../constants/OperationModeNames'

class ModeDisplay extends Component {
  constructor(props) {
    super(props)

    this.state = {
      mode: props.mode
    }
  }

  componentWillReceiveProps(newProps) {
    if (newProps.mode === this.state.mode) {
      return false
    } else {
      this.setState({
        mode: newProps.mode
      })
    }
  }

  render() {
    return (
      <Title>
        {modeNames[this.state.mode]}
      </Title>
    )
  }
}

ModeDisplay.propTypes = {
  mode: PropTypes.number.isRequired
}

ModeDisplay.defaultProps = {
  mode: modes.ORDERING
}

export default ModeDisplay
