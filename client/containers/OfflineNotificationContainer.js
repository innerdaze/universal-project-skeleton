import { connect } from 'react-redux'
import OfflineNotification from '../components/OfflineNotification'
import { networkOperations, networkSelectors } from '../features/network'
const mapDispatchToProps = dispatch => {
  return {
    setIsOfflineFlag: flag => {
      dispatch(networkOperations.setIsOffline(flag))
    }
  }
}
const mapStateToProps = state => {
  return {
    isOffline: networkSelectors.isOffline(state)
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(OfflineNotification)
