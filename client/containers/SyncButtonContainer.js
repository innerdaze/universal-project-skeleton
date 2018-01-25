import { connect } from 'react-redux'
import { syncOperations } from '../ducks/sync'
import SyncButton from '../components/SyncButton'

const mapDispatchToProps = dispatch => {
  return {
    sync: () => {
      dispatch(syncOperations.sync())
    }
  }
}

const SyncButtonContainer = connect(
  null,
  mapDispatchToProps
)(SyncButton)

export default SyncButtonContainer
