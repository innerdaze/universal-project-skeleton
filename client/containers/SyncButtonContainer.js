import { connect } from 'react-redux'
import { sync } from '../actions/SyncActions'
import SyncButton from '../components/SyncButton'

const mapDispatchToProps = dispatch => {
  return {
    sync: () => {
      dispatch(sync())
    }
  }
}

const SyncButtonContainer = connect(
  null,
  mapDispatchToProps
)(SyncButton)

export default SyncButtonContainer
