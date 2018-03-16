import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Box from 'grommet/components/Box'
import Heading from 'grommet/components/Heading'
import Meter from 'grommet/components/Meter'
import Value from 'grommet/components/Value'

class BackgroundSyncProgress extends Component {
  render() {
    return (
      <Box align='stretch'>
        <Heading>Synchronizing Data...</Heading>
        <Meter
          type='bar'
          max={1}
          size='small'
          value={this.props.progress}
          label={
            <Value units='%' value={Math.floor(this.props.progress * 100, 2)} />
          }
        />
      </Box>
    )
  }
}

BackgroundSyncProgress.propTypes = {
  progress: PropTypes.number.isRequired
}

BackgroundSyncProgress.defaultProps = {
  progress: 0
}

export default BackgroundSyncProgress
