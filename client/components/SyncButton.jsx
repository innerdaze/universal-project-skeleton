import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Button from 'grommet/components/Button'
import RefreshIcon from 'grommet/components/icons/base/Refresh'

export default class SyncButton extends Component {
  constructor(props) {
    super(props)

    this.sync = this.sync.bind(this)
  }

  sync() {
    this.props.sync()
  }

  render() {
    return (
      <Button
        plain
        icon={<RefreshIcon/>}
        onClick={this.sync}
        />
    )
  }
}

SyncButton.propTypes = {
  sync: PropTypes.func.isRequired
}

SyncButton.defaultProps = {
  sync: Function.prototype
}
