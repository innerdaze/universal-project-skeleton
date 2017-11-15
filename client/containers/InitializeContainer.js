import { connect } from 'react-redux'
import { setApiRoot, setStoreID } from '../actions/AppActions'
import Initialize from '../components/Initialize'

export default connect(state => ({
  isLoggedIn: state.session.alive,
  isInitialized: state.app.isInitialized,
  apiRootValidationError: state.validation.apiRoot
}), dispatch => ({
  onApiRootFormSubmit: data => {
    dispatch(setStoreID(data.storeID))
    dispatch(setApiRoot(data.apiRoot))
  }
}))(Initialize)
