import { some, isUndefined, isNull } from 'lodash'
import { isWebUri } from 'valid-url'
import {
  APP_INITIALIZE,
  APP_SET_API_ROOT,
  API_ROOT_VALID,
  API_ROOT_INVALID
} from '../constants/ActionTypes'
import { sync } from '../actions/SyncActions'
import { login } from '../actions/SessionActions'
import { validate } from '../actions/ValidationActions'
import { callApi } from '../actions/NetworkActions'
import { displayError } from '../actions/ErrorActions'

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
          await dispatch(sync())
          return dispatch(initialize())
        }
      } else {
        dispatch(_setApiRoot(null))
      }
    }
  }
}
