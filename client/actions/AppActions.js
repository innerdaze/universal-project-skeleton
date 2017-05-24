import { some, isUndefined, isNull } from 'lodash'
import { isWebUri } from 'valid-url'
import { APP_INITIALIZE, APP_SET_API_ROOT } from '../constants/ActionTypes'

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

/**
 * Validation is the responsibilty of the input mechanism
 */
export function setApiRoot(apiRoot) {
  return (dispatch, getState) => {
    dispatch(_setApiRoot(apiRoot))

    if (checkInitialised(getState())) {
      dispatch(initialize())
    }
  }
}
