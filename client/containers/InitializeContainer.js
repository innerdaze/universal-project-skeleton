import { connect } from 'react-redux'
//import { appOperations } from '../ducks/app'
import Initialize from '../components/Initialize'
//import InitializeSelector from '../selectors/InitializeSelector'
import {appSelectors,appOperations} from '../ducks/app'
import {sessionSelectors} from '../ducks/session'
debugger
export default connect(state => ({
  isLoggedIn: sessionSelectors.isLoggedIn,
  isInitialized: appSelectors.isInitialized,
  apiRootValidationError: sessionSelectors.apiRootValidationError
}), dispatch => ({
  onApiRootFormSubmit: data => {debugger
    dispatch(appOperations.setStoreID(data.storeID))
    dispatch(appOperations.setApiRoot(data.apiRoot))
  }
}))(Initialize)
