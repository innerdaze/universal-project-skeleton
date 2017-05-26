import { connect } from 'react-redux'
import BackgroundSyncProgress from '../components/BackgroundSyncProgress.jsx'

const mapStateToProps = state => {
  return {
    progress: state.sync.progress
  }
}

const BackgroundSyncProgressContainer = connect(
  mapStateToProps
)(BackgroundSyncProgress)

export default BackgroundSyncProgressContainer
