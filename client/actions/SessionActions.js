import fetch from 'isomorphic-fetch'
import history from '../history'
import { apiURL } from '../config'
import {
  REQUEST_LOGIN,
  RECEIVE_LOGIN,
  REQUEST_LOGOUT,
  RECEIVE_LOGOUT,
  START_SESSION,
  END_SESSION,
  SUCCEED_LOGIN,
  FAIL_LOGIN
} from '../constants/ActionTypes'
import { checkStatusAndParseJSON } from '../helpers/Network'

export function startSession(id) {
  return {
    type: START_SESSION,
    id: id
  }
}

export function endSession() {
  return {
    type: END_SESSION
  }
}

export function requestLogin() {
  return {
    type: REQUEST_LOGIN
  }
}

export function receiveLogin(user) {
  return {
    type: RECEIVE_LOGIN,
    receivedAt: Date.now()
  }
}

export function succeedLogin(user) {
  return {
    type: SUCCEED_LOGIN,
    user
  }
}

export function failLogin(error) {
  return {
    type: FAIL_LOGIN,
    error: error
  }
}

export function requestLogout() {
  return {
    type: REQUEST_LOGOUT
  }
}

export function receiveLogout() {
  return {
    type: RECEIVE_LOGOUT,
    receivedAt: Date.now()
  }
}

export function login(userID, password) {
  return function (dispatch) {
    dispatch(requestLogin())

    return fetch(apiURL, {
      method: 'post',
      body: JSON.stringify({
        method: 'SystemLoginService.Login',
        params: {
          UserID: userID,
          Password: password
        }
      })
    })
      .then((response) => {
        dispatch(receiveLogin())
        return response
      })
      .then(checkStatusAndParseJSON)
      .then(json => {
        dispatch(startSession(json.result.Result.SessionID))
        dispatch(succeedLogin(json.result.Result.UserData))
        history.push('/orders')
      })
      .catch(error => {
        dispatch(failLogin(error))
      })
  }
}

export function logout(sessionID) {
  return function (dispatch) {
    dispatch(requestLogout())

    return fetch(apiURL, {
      method: 'post',
      body: JSON.stringify({
        method: 'SystemLoginService.Logout',
        params: {
          SessionID: sessionID
        }
      })
    })
      .then(checkStatusAndParseJSON)
      .then(() => {
        dispatch(receiveLogout())
        dispatch(endSession())
      })
  }
}
