import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Box from 'grommet/components/Box'
import Meter from 'grommet/components/Meter'
import Value from 'grommet/components/Value'

class BackgroundSyncProgress extends Component {
  render() {
    return this.props.isSyncing && (
      <Box>
        <Meter
          type='bar'
          max={1}
          fill={true}
          value={this.props.progress}
          label={<Value
            units='%'
            responsive={true}
            value={Math.floor(this.props.progress * 100, 2)}
            />}
          />
      </Box>
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
