import 'whatwg-fetch'
import { is } from 'ramda'
import actions from './actions'
import { failIfMissing } from '~/helpers/Function'
import { sessionOperations } from '../../features/session'
import { errorOperations } from '../error'
import { sessionSelectors } from '../session'

const networkAction = actions.network

export const callApi = ({
  apiRoot = null,
  service = failIfMissing('service'),
  headers = {},
  params = {},
  method = 'post',
  success = message => Promise.resolve(message),
  failure = error => Promise.reject(error),
  skipSessionCheck = false
}) => (dispatch, getState) => {
  if (!isOnline()) {
    dispatch(networkAction.netFailOffline())
    return
  }

  return (function restart() {
    if (!skipSessionCheck) {
      params.SessionID = getState().session.session.id
    }

    return fetch(apiRoot || getState().app.apiRoot, {
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
          await dispatch(sessionOperations.login('apiuser', 'api.123'))
          return restart()
        }

        if (res.error) {
          throwError(res, res.error)
        }

        let error = validateResCode(res)
        if (error) {
          throwError(res, error)
        }

        return res
      })
      .then(success)
      .catch(failure)
    // dispatch(errorOperations.displayError(error.message))
    // failure(error)
    // })
  })()
}

const validateResCode = ({ result }) => {
  if (result) {
    const { Result } = result

    if (Result) {
      if (is(Number, Result.ResCode)) {
        if (Result.ResCode !== 0) return Result.ResMessage
      }

      if (Result.ResMessage) {
        if (is(Number, Result.ResMessage.ResCode)) {
          if (Result.ResMessage.ResCode !== 0)
            return Result.ResMessage.ResMessage || Result.ResMessage.ResCode
        }
      }
    }
  }
}

const validateSession = ({ result }) => {
  return !(
    result &&
    result.Result &&
    result.Result.ResMessage &&
    (result.Result.ResMessage === 'Session has expired' ||
      result.Result.ResMessage.ResMessage === 'Session has expired' ||
      result.Result.ResMessage === 'Session not found' ||
      result.Result.ResMessage.ResMessage === 'Session not found')
  )
}

const throwError = (data, errorMessage) => {
  const error = new Error(errorMessage)
  error.response = data
  throw error
}

const checkStatusAndParseJSON = response =>
  response.json().then(data => {
    if (
      data.result.Result.ResMessage.ResCode === 0 ||
      data.result.Result.ResCode === 0
    ) {
      return data
    }

    throwError(data, data.result.Result.ResMessage.ResMessage)
  })

export const isOnline = () =>
  window.navigator
    ? window.cordova
      ? navigator.connection.type !== navigator.connection.NONE
      : window.navigator.onLine
    : true

export default {
  ...actions.network,
  callApi,
  validateResCode,
  validateSession,
  throwError,
  checkStatusAndParseJSON,
  isOnline
}
