import { connect } from 'react-redux'
import BackgroundSyncProgress from '../components/BackgroundSyncProgress.jsx'

const mapStateToProps = state => {
  return {
    isSyncing: state.sync.isSyncing
  }
}

const BackgroundSyncProgressContainer = connect(
  mapStateToProps
)(BackgroundSyncProgress)

export default BackgroundSyncProgressContainer
