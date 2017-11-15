import { some, isUndefined, isNull } from 'lodash'
import { isWebUri } from 'valid-url'
import {
  APP_RESET,
  APP_INITIALIZE,
  APP_SET_API_ROOT,
  APP_SET_STORE_ID,
  API_ROOT_VALID,
  API_ROOT_INVALID
} from '../constants/ActionTypes'
import { sync } from '../actions/SyncActions'
import { login } from '../actions/SessionActions'
import { validate } from '../actions/ValidationActions'
import { callApi } from '../actions/NetworkActions'
import { displayError } from '../actions/ErrorActions'
import { resetCashiers, logoutCashier } from '../actions/CashierActions'
import { resetBarcodes } from '../actions/BarcodeActions'
import { resetProducts } from '../actions/ProductActions'

const requiredConfigs = [
  'apiRoot'
]

function initialize() {
  return {
    type: APP_INITIALIZE
  }
}

export function _setApiRoot(apiRoot) {
  return {
    type: APP_SET_API_ROOT,
    apiRoot
  }
}

export function setStoreID(storeID) {
  return {
    type: APP_SET_STORE_ID,
    storeID
  }
}

function checkInitialised(state) {
  return !some(requiredConfigs, config => (
    isUndefined(state.app[config]) || isNull(state.app[config])
  ))
}

export function setAPIRootInvalid() {
  return {
    type: API_ROOT_INVALID
  }
}

export function setAPIRootValid() {
  return {
    type: API_ROOT_VALID
  }
}

export function testAPIRoot() {
  return async dispatch => {
    return dispatch(callApi({
      service: 'GeneralService.GetTimeStamp',
      skipSessionCheck: true,
      method: 'post',
      success: () => dispatch(setAPIRootValid()),
      error: error => {
        dispatch(displayError(error.message))
        dispatch(setAPIRootInvalid())
      }
    }))
  }
}

/**
 * Validation is the responsibilty of the input mechanism
 */
export function setApiRoot(apiRoot) {
  return async (dispatch, getState) => {
    const fieldID = 'apiRoot'
    const error = 'Invalid URI'

    dispatch(_setApiRoot(apiRoot))

    if (dispatch(validate({
      fieldID,
      value: apiRoot,
      validation: async url => isWebUri(url),
      error
    }))) {
      await dispatch(testAPIRoot(apiRoot))

      if (getState().app.apiRootValid) {
        if (checkInitialised(getState())) {
          await dispatch(login('apiuser', 'api.123'))

          if (getState().session.alive) {
            await dispatch(sync())
            return dispatch(initialize())
          } else {
            dispatch(_setApiRoot(null))
          }
        }
      } else {
        dispatch(_setApiRoot(null))
      }
    }
  }
}

export function reset() {
  return async dispatch => {
    dispatch(resetCashiers())
    dispatch(resetProducts())
    dispatch(resetBarcodes())
    await dispatch(logoutCashier())
    dispatch({type: APP_RESET})
  }
}
