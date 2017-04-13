import React, { Component, PropTypes } from 'react'
import Meter from 'grommet/components/Meter'

class BackgroundSyncProgress extends Component {

  constructor(props) {
    super(props)

    this.state = {
      progress: 0
    }
  }

  render() {
    return this.state.isSyncing && (
      <Meter type='bar' value={this.state.progress}/>
    ) || null
  }
}

BackgroundSyncProgress.propTypes = {
  isSyncing: React.PropTypes.bool
}

BackgroundSyncProgress.defaultProps = {
  isSyncing: false
}

export default BackgroundSyncProgress
