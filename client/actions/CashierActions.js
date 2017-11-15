import {
  REQUEST_CASHIERS,
  RECEIVE_CASHIERS,
  INVALIDATE_CASHIERS,
  RESET_CASHIERS,
  LOGIN_CASHIER,
  LOGOUT_CASHIER,
  SUCCEED_LOGIN_CASHIER,
  FAIL_LOGIN_CASHIER
} from '../constants/ActionTypes'
import { displayError, dismissError } from '../actions/ErrorActions'
import { callApi } from './NetworkActions'

export function requestCashiers() {
  return {
    type: REQUEST_CASHIERS
  }
}

export function receiveCashiers(json) {
  return {
    type: RECEIVE_CASHIERS,
    cashiers: json.filter(item => !item.Deleted),
    receivedAt: Date.now()
  }
}

export function fetchCashiers() {
  return dispatch => {
    dispatch(requestCashiers())

    return dispatch(callApi({
      service: 'CashierService.GetCashiers',
      params: {
        StoreID: 0
      },
      success: json => dispatch(receiveCashiers(json.result.Result.ListOfCashiers))
    }))
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

export function loginCashier(id, password) {
  return (dispatch, getState) => {
    dispatch(_loginCashier())

    const error = `Username or password not found`

    const cashier = getState().cashierEntities[id]

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

    dispatch(dismissError())
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

export function resetCashiers() {
  return {
    type: RESET_CASHIERS
  }
}
