import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Button from 'grommet/components/Button'

class ProcessItemsButton extends Component {
  constructor(props) {
    super(props)

    this.state = {
      canProcess: true
    }

    this.onClick = this.onClick.bind(this)
  }

  onClick(e) {
    e.preventDefault()
    this.props.onProcessItemsClick()
  }

  render() {
    return (
      <Button
        disabled={this.state.canProcess}
        label="Process"
        onClick={this.onClick}
        primary/>
    )
  }
}

ProcessItemsButton.propTypes = {
  onProcessItemsClick: PropTypes.func.isRequired
}

ProcessItemsButton.defaultProps = {
  onProcessItemsClick: Function.prototype
}

export default ProcessItemsButton
