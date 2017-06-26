import {
  NET_FAIL_OFFLINE,
  NET_FAIL_NO_SESSION
} from '../constants/ActionTypes'
import { login } from './SessionActions'
import { displayError } from './ErrorActions'

export function networkFailOffline() {
  return {
    type: NET_FAIL_OFFLINE
  }
}

export function networkFailNoSession() {
  return {
    type: NET_FAIL_NO_SESSION
  }
}

export function callApi({
  service = failIfMissing('service'),
  headers = {},
  params = {},
  method = 'post',
  success = json => json,
  failure = error => error,
  skipSessionCheck = false
}) {
  return function (dispatch, getState) {
    if (!isOnline()) {
      dispatch(networkFailOffline())
      return
    }

    return (function restart() {
      return fetch(getState().app.apiRoot, {
        method,
        headers,
        body: JSON.stringify({
          method: service,
          params: {
            ...params,
            SessionID: getState().session.id
          }
        })
      })
      .then(res => res.json())
      .then(async data => {
        if (!skipSessionCheck && !validateSession(data)) {
          await dispatch(login('apiuser', 'api.123'))
          return restart()
        }

        if (!validateResCode(data)) {
          throwError(data, data.result.Result.ResMessage.ResMessage)
        }

        return data
      })
      .then(success)
      .catch(error => {
        dispatch(displayError(error.message))
        failure(error)
      })
    })()
  }
}

export function validateResCode(data) {
  return (
    data.result.Result.ResMessage.ResCode === 0 ||
    data.result.Result.ResCode === 0
  )
}

export function validateSession(data) {
  return !(
    data.result.Result.ResCode === 99 &&
    data.result.Result.ResMessage === 'Session has expired'
  )
}

export function throwError(data, errorMessage) {
  const error = new Error(errorMessage)
  error.response = data
  throw error
}

export function checkStatusAndParseJSON(response) {
  return response.json()
    .then(data => {
      if (
        data.result.Result.ResMessage.ResCode === 0 ||
        data.result.Result.ResCode === 0
      ) {
        return data
      }

      throwError(data, data.result.Result.ResMessage.ResMessage)
    })
}

export function isOnline() {
  return window.cordova && window.navigator ? navigator.connection.type !== navigator.connection.NONE : true
}
