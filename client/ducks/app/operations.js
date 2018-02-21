import actions from './actions'
import { some, isUndefined, isNull } from 'lodash'
import { isWebUri } from 'valid-url'
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

const testAPIRoot = () => {
  return async dispatch => {
    return dispatch(
      networkOperations.callApi({
        service: 'GeneralService.GetTimeStamp',
        skipSessionCheck: true,
        method: 'post',
        success: () => dispatch(appAction.apiRootValid()),
        error: error => {
          dispatch(errorOperations.displayError(error.message))
          dispatch(appAction.apiRootInvalid())
        }
      })
    )
  }
}

/**
 * Validation is the responsibility of the input mechanism
 */
const setApiRoot = apiRoot => {
  return async (dispatch, getState) => {
    const fieldID = 'apiRoot'
    const error = 'Invalid URI'
    dispatch(appAction.appSetApiRoot(apiRoot))

    if (
      dispatch(
        validationOperations.validate({
          fieldID,
          value: apiRoot,
          validation: async url => isWebUri(url),
          error
        })
      )
    ) {
      await dispatch(testAPIRoot(apiRoot))

      if (getState().app.apiRootValid) {
        if (checkInitialised(getState())) {
          await dispatch(sessionOperations.login('apiuser', 'api.123'))

          if (getState().session.session.alive) {
            await dispatch(syncOperations.sync())
            return dispatch(appAction.appInitialize())
          } else {
            dispatch(appAction.appSetApiRoot(null))
          }
        }
      } else {
        dispatch(appAction.appSetApiRoot(null))
      }
    }
  }
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
    dispatch(appAction.appReset())
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
