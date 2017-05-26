import fetch from 'isomorphic-fetch'
import {
  REQUEST_CASHIERS,
  RECEIVE_CASHIERS,
  INVALIDATE_CASHIERS,
  LOGIN_CASHIER,
  LOGOUT_CASHIER,
  SUCCEED_LOGIN_CASHIER,
  FAIL_LOGIN_CASHIER
} from '../constants/ActionTypes'
import { displayError } from '../actions/ErrorActions'

export function requestCashiers() {
  return {
    type: REQUEST_CASHIERS
  }
}

export function receiveCashiers(json) {
  return {
    type: RECEIVE_CASHIERS,
    cashiers: json,
    receivedAt: Date.now()
  }
}

export function fetchCashiers(sessionID) {
  return function (dispatch, getState) {
    dispatch(requestCashiers())

    return fetch(getState().app.apiRoot, {
      method: 'post',
      body: JSON.stringify({
        method: 'CashierService.GetCashiers',
        params: {
          SessionID: sessionID,
          StoreID: 0
        }
      })
    })
      .then(response => response.json())
      .then(json =>
        dispatch(receiveCashiers(json.result.Result.ListOfCashiers))
      )
  }
}

export function invalidateCashiers() {
  return {
    type: INVALIDATE_CASHIERS
  }
}

function _loginCashier() {
  return {
    type: LOGIN_CASHIER
  }
}

export function loginCashier(username, password) {
  return (dispatch, getState) => {
    dispatch(_loginCashier())

    const error = `Username or password not found`

    const cashierId = getState().cashiers.idByUsername[username]
    const cashier = getState().cashierEntities[cashierId]

    if (!cashier) {
      dispatch(failLoginCashier(error))
      dispatch(displayError(error))
      return
    }

    if (cashier.CashierPassword !== password) {
      dispatch(failLoginCashier(error))
      dispatch(displayError(error))
      return
    }

    dispatch(succeedLoginCashier(cashier))
  }
}

export function logoutCashier() {
  return {
    type: LOGOUT_CASHIER
  }
}

export function failLoginCashier(error) {
  return {
    type: FAIL_LOGIN_CASHIER,
    error
  }
}

export function succeedLoginCashier(cashier) {
  return {
    type: SUCCEED_LOGIN_CASHIER,
    cashier
  }
}
