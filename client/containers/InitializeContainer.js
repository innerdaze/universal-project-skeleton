import { connect } from 'react-redux'
//import { appOperations } from '../features/app'
import Initialize from '../components/Initialize'
import { appSelectors, appOperations } from '../features/app'
import { sessionSelectors, sessionOperations } from '../features/session'
import { errorOperations } from '../features/error'
import { syncOperations } from '../features/sync'

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
    onApiRootFormSubmit: ({ domain, apiRoot, storeID, allowPriceUpdate }) => {
      dispatch(errorOperations.dismissError())

      dispatch(sessionOperations.setDomain(domain))

      dispatch(appOperations.setApiRoot(apiRoot)).then(
        () => {
          dispatch(appOperations.setStoreID(storeID))
          dispatch(appOperations.setAllowPriceUpdate(allowPriceUpdate))
          dispatch(appOperations.appInitialize())
          return dispatch(syncOperations.sync())
        },
        error => dispatch(errorOperations.displayError(error.message))
      )
    }
  })
)(Initialize)
