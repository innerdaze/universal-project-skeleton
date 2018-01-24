import actions from './actions'
import { failIfMissing } from '../../helpers/Function'
import { login } from '../../actions/SessionActions'
import { errorOperations } from '../error'
export function callApi({
  service = failIfMissing('service'),
  headers = {},
  params = {},
  method = 'post',
  success = json => json,
  failure = error => error,
  skipSessionCheck = false
}) {debugger
  return function (dispatch, getState) {
    if (!isOnline()) {
      dispatch(actions.netFailOfline())
      return
    }

    return (function restart() {
      const sessionID = getState().session.id

      if (sessionID) {
        params.SessionID = sessionID
      }

      return fetch(getState().app.apiRoot, {
        method,
        headers,
        body: JSON.stringify({
          method: service,
          params
        })
      })
      .then(res => res.json())
      .then(async res => {
        if (!skipSessionCheck && !validateSession(res)) {
          await dispatch(login('apiuser', 'api.123'))
          return restart()
        }

        if (res.error) {
          throwError(res.error)
        }

        if (!validateResCode(res)) {
          throwError(res, res.result.Result.ResMessage.ResMessage)
        }

        return res
      })
      .then(success)
      .catch(error => {
        dispatch(errorOperations.displayError(error.message))
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
    ( data.result.Result.ResMessage === 'Session has expired' ||
      data.result.Result.ResMessage.ResMessage === 'Session has expired' ||
      data.result.Result.ResMessage === '[DBNETLIB][ConnectionOpen (Connect()).]SQL Server does not exist or access denied.'
    )
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

export default {
  netFailNoSession,NetFailNoSession,callApi,validateResCode,validateSession,throwError,checkStatusAndParseJSON,isOnline
}