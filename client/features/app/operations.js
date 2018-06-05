import { some, isUndefined, isNull } from 'lodash'
import { isWebUri } from 'valid-url'
import actions from './actions'
import selectors from './selectors'
import { syncOperations } from '../sync'
import { sessionOperations } from '../session'
import { isLoggedIn } from '../session/selectors'
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
      dispatch(appAction.apiRootInvalid())
      throw error
    })

/**
 * Validation is the responsibility of the input mechanism
 */
const setApiRoot = apiRoot => async (dispatch, getState) => {
  const state = getState()

  dispatch(appAction.appSetApiRoot(apiRoot))

  return dispatch(
    validationOperations.validateP({
      fieldID: 'apiRoot',
      value: apiRoot,
      validation: isWebUri,
      error: Error('Invalid URI')
    })
  )
    .then(valid => dispatch(testAPIRoot(apiRoot)))
    .then(
      () => (isLoggedIn(state) ? dispatch(sessionOperations.logout()) : true)
    )
    .then(() => dispatch(sessionOperations.login('apiuser', 'api.123')))
    .catch((error = Error('Session Login Failed')) => {
      dispatch(appAction.appSetApiRoot(null))
      throw error
    })
}

const setStoreID = storeID => async dispatch =>
  dispatch(appAction.appSetStoreId(storeID))

const checkInitialised = state =>
  !some(
    requiredConfigs,
    config => isUndefined(state.app[config]) || isNull(state.app[config])
  )

const reset = () => async dispatch => {
  dispatch(cashierOperations.resetCashiers())
  dispatch(productOperations.resetProducts())
  dispatch(barcodeOperations.resetBarcodes())
  await dispatch(cashierOperations.logoutCashier())
  dispatch(appAction.appReconfigure())
}

export default {
  ...actions.app,
  testAPIRoot,
  setApiRoot,
  checkInitialised,
  reset,
  setStoreID
}
