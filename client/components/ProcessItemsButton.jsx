import React, { Component, PropTypes } from 'react'
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
      <Button label='Process' primary={true}/>
    )
  }
}

export default ProcessItemsButton
