import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Meter from 'grommet/components/Meter'

class BackgroundSyncProgress extends Component {
  render() {
    return this.props.isSyncing && (
      <Meter
        type='bar'
        max={1}
        fill={true}
        value={this.props.progress}
        />
    ) || null
  }
}

BackgroundSyncProgress.propTypes = {
  isSyncing: PropTypes.bool.isRequired,
  progress: PropTypes.number.isRequired
}

BackgroundSyncProgress.defaultProps = {
  isSyncing: false,
  progress: 0
}

export default BackgroundSyncProgress
