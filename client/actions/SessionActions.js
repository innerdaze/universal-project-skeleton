import fetch from 'isomorphic-fetch'
import { push } from 'connected-react-router'
import history from '../history'
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
import { displayError } from '../actions/ErrorActions'
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
    error
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
  return function (dispatch, getState) {
    dispatch(requestLogin())

    return fetch(getState().app.apiRoot, {
      method: 'post',
      body: JSON.stringify({
        method: 'SystemLoginService.Login',
        params: {
          UserID: userID,
          Password: password
        }
      })
    })
      .then(response => {
        dispatch(receiveLogin())
        return response
      })
      .then(checkStatusAndParseJSON)
      .then(json => {
        dispatch(startSession(json.result.Result.SessionID))
        dispatch(succeedLogin(json.result.Result.UserData))
      })
      .catch(error => {
        const message = error && error.message || 'Could not login at this time. Please try again later or contact support'
        dispatch(failLogin(message))
        dispatch(displayError(message))
      })
  }
}

export function logout(sessionID) {
  return function (dispatch, getState) {
    dispatch(requestLogout())

    return fetch(getState().app.apiRoot, {
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
