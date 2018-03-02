import { connect } from 'react-redux'
//import { appOperations } from '../ducks/app'
import Initialize from '../components/Initialize'
//import InitializeSelector from '../selectors/InitializeSelector'
import { appSelectors, appOperations } from '../features/app'
import { sessionSelectors } from '../features/session'

export default connect(
  state => ({
    isLoggedIn: sessionSelectors.isLoggedIn(state),
    isInitialized: appSelectors.isInitialized(state),
    apiRootValidationError: sessionSelectors.apiRootValidationError(state)
  }),
  dispatch => ({
    onApiRootFormSubmit: data => {
      dispatch(appOperations.setStoreID(data.storeID))
      dispatch(appOperations.setApiRoot(data.apiRoot))
      dispatch(appOperations.setAllowPriceUpdate(data.allowPriceUpdate))
    }
  })
)(Initialize)
