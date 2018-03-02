import { connect } from 'react-redux'
import BackgroundSyncProgress from '../components/BackgroundSyncProgress'
import { syncSelectors } from '../features/sync'
const mapStateToProps = state => {
  return {
    progress: syncSelectors.progress(state)
  }
}

const BackgroundSyncProgressContainer = connect(mapStateToProps)(
  BackgroundSyncProgress
)

export default BackgroundSyncProgressContainer
