
import { combineReducers } from 'redux'
import { handleActions } from 'redux-actions'
import actions from './actions'
import { keyBy, fromPairs, map } from 'lodash'
const { cashier } = actions
const initialState = {
  isFetching: false,
  didInvalidate: false,
  lastUpdated: null,
  items: [],
  activeCashier: null,
  isAuthenticating: false,
  authError: null
}
const reducer = handleActions({
  [cashier.invalidateCashiers](state) {
    return {
      ...state,
      didInvalidate: true
    }
  },
  [cashier.requestCashiers](state) {
    return {
      ...state,
      isFetching: true,
      didInvalidate: false
    }
  },
  [cashier.receiveCashiers](state, { payload: { json } }) {
    return {
      ...state,
      isFetching: false,
      didInvalidate: false,
      items: map(json.filter(item => !item.Deleted), 'CashierID'),
      lastUpdated: Date.now()
    }
  },
  [cashier.resetCashiers](state) {
    return {
      ...state,
      items: []
    }
  },
  [cashier.loginCashier](state) {
    return {
      ...state,
      isAuthenticating: true
    }
  },
  [cashier.succeedLoginCashier](state, { payload: { cashier } }) {
    return {
      ...state,
      isAuthenticating: false,
      activeCashier: cashier
    }
  },
  [cashier.failLoginCashier](state, { payload: { error } }) {
    return {
      ...state,
      isAuthenticating: false,
      authError: error
    }
  },
  [cashier.logoutCashier](state) {
    return {
      ...state,
      activeCashier: null
    }
  },

}, initialState)

export default reducer
