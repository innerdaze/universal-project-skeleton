import fetch from 'isomorphic-fetch'
import { apiURL } from '../config'
import {
  REQUEST_CASHIERS,
  RECEIVE_CASHIERS,
  INVALIDATE_CASHIERS
} from '../constants/ActionTypes'

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
  return function (dispatch) {
    dispatch(requestCashiers())

    return fetch(apiURL, {
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
