import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Button from 'grommet/components/Button'

class ProcessItemsButton extends Component {
  constructor(props) {
    super(props)

    this.state = {
      canProcess: true
    }

    this.handleClick = this.handleClick.bind(this)
  }

  handleClick(e) {
    e.preventDefault()
    this.props.onProcessItemsClick()
  }

  render() {
    return (
      <Button
        primary
        disabled={this.state.canProcess}
        label='Send'
        onClick={this.handleClick}
      />
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
