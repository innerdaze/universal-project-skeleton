import { connect } from 'react-redux'
//import { appOperations } from '../ducks/app'
import Initialize from '../components/Initialize'
import InitializeSelector from '../selectors/InitializeSelector'
import {appSelectors,appOperations} from '../ducks/app'
export default connect(state => ({
  isLoggedIn: InitializeSelector.isLoggedIn,
  isInitialized: appSelectors.isInitialized,
  apiRootValidationError: InitializeSelector.apiRootValidationError
}), dispatch => ({
  onApiRootFormSubmit: data => {debugger
    dispatch(appOperations.setStoreID(data.storeID))
    dispatch(appOperations.setApiRoot(data.apiRoot))
  }
}))(Initialize)
