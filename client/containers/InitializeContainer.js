import { connect } from 'react-redux'
//import { appOperations } from '../features/app'
import Initialize from '../components/Initialize'
import { appSelectors, appOperations } from '../features/app'
import { sessionSelectors, sessionOperations } from '../features/session'
import { errorOperations } from '../features/error'

export default connect(
  state => ({
    isLoggedIn: sessionSelectors.isLoggedIn(state),
    isInitialized: appSelectors.isInitialized(state),
    apiRootValidationError: sessionSelectors.apiRootValidationError(state),
    storeId: appSelectors.storeID(state),
    allowPriceUpdate: appSelectors.allowPriceUpdateSelector(state),
    apiRoot: appSelectors.apiRoot(state),
    domain: sessionSelectors.domainSelector(state),
    requiresDomain: sessionSelectors.requiresDomainSelector(state)
  }),
  dispatch => ({
    onApiRootFormSubmit: data => {
      dispatch(appOperations.setStoreID(data.storeID))
      dispatch(appOperations.setApiRoot(data.apiRoot))
      dispatch(appOperations.setAllowPriceUpdate(data.allowPriceUpdate))
      dispatch(sessionOperations.setDomain(data.domain))
    }
  })
)(Initialize)
