import { connect } from 'react-redux'
import { setApiRoot, setStoreID } from '../actions/AppActions'
import Initialize from '../components/Initialize'
import InitializeSelector from '../selectors/InitializeSelector'
export default connect(state => ({
  isLoggedIn: InitializeSelector.isLoggedIn,
  isInitialized: InitializeSelector.isInitialized,
  apiRootValidationError: InitializeSelector.apiRootValidationError
}), dispatch => ({
  onApiRootFormSubmit: data => {
    dispatch(setStoreID(data.storeID))
    dispatch(setApiRoot(data.apiRoot))
  }
}))(Initialize)
