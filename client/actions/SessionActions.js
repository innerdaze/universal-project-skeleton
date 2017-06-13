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
import { callApi } from './NetworkActions'

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
  return (dispatch, getState) => {
    dispatch(requestLogin())

    return dispatch(callApi({
      service: 'SystemLoginService.Login',
      skipSessionCheck: true,
      params: {
        UserID: userID,
        Password: password
      },
      success: json => {
        dispatch(receiveLogin())
        dispatch(startSession(json.result.Result.SessionID))
        dispatch(succeedLogin(json.result.Result.UserData))
      },
      error: error => {
        const message = error && error.message || 'Could not login at this time. Please try again later or contact support'
        dispatch(failLogin(message))
        dispatch(displayError(message))
      }
    }))
  }
}

export function logout() {
  return (dispatch, getState) => {
    dispatch(requestLogout())

    return dispatch(callApi({
      service: 'SystemLoginService.Logout',
      params: {
        SessionID: getState().session.id
      },
      success: json => {
        dispatch(receiveLogout())
        dispatch(endSession())
      }
    }))
  }
}
