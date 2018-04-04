import { some, isUndefined, isNull } from 'lodash'
import { isWebUri } from 'valid-url'
import actions from './actions'
import selectors from './selectors'
import { syncOperations } from '../sync'
import { sessionOperations } from '../session'
import { validationOperations } from '../validation'
import { networkOperations } from '../network'
import { errorOperations } from '../error'
import { cashierOperations } from '../cashier'
import { barcodeOperations } from '../barcode'
import { productOperations } from '../product'

const appAction = actions.app
const requiredConfigs = ['apiRoot']

const testAPIRoot = () => async dispatch =>
  dispatch(
    networkOperations.callApi({
      service: 'GeneralService.GetTimeStamp',
      skipSessionCheck: true,
      method: 'post'
    })
  )
    .then(() => dispatch(appAction.apiRootValidate()))
    .catch(error => {
      dispatch(errorOperations.displayError(error.message))
      dispatch(appAction.apiRootInvalid())
    })

/**
 * Validation is the responsibility of the input mechanism
 */
const setApiRoot = apiRoot => async (dispatch, getState) => {
  const fieldID = 'apiRoot'
  const error = 'Invalid URI'
  const state = getState()

  dispatch(appAction.appSetApiRoot(apiRoot))

  dispatch(
    validationOperations.validateP({
      fieldID,
      value: apiRoot,
      validation: isWebUri,
      error
    })
  )
    .then(valid => dispatch(testAPIRoot(apiRoot)))
    .then(() => {
      if (checkInitialised(getState())) {
        return dispatch(sessionOperations.login('apiuser', 'api.123'))
      }
      throw Error('Initialization Failed')
    })
    .then(() => {
      if (getState().session.session.alive) {
        return dispatch(syncOperations.sync())
      }
      throw Error('Session Login Failed')
    })
    .then(() => dispatch(appAction.appInitialize()))
    .catch(error => dispatch(appAction.appSetApiRoot(null)))
}

const setStoreID = storeID => {
  return async dispatch => {
    dispatch(appAction.appSetStoreId(storeID))
  }
}

const checkInitialised = state => {
  return !some(
    requiredConfigs,
    config => isUndefined(state.app[config]) || isNull(state.app[config])
  )
}

const reset = () => {
  return async dispatch => {
    dispatch(cashierOperations.resetCashiers())
    dispatch(productOperations.resetProducts())
    dispatch(barcodeOperations.resetBarcodes())
    await dispatch(cashierOperations.logoutCashier())
    dispatch(appAction.appReconfigure())
  }
}

export default {
  ...actions.app,
  testAPIRoot,
  setApiRoot,
  checkInitialised,
  reset,
  setStoreID
}
