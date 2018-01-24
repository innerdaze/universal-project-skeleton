
import { combineReducers } from 'redux'
import { handleActions } from 'redux-actions'
import actions from './actions'
const { scanner } = actions
const initialState = {
  id: null,
  alive: false,
  isRequesting: false,
  lastUpdated: null,
  error: null
}
debugger
const reducer = handleActions({
  [scanner.startSession] (state,{payload}) {
    return {
      ...state,
      id: payload,
      alive: true
    }
  },
  [scanner.endSession] (state) {
    return {
      ...state,
      id: null,
      alive: false
    }
  },
  [scanner.requestLogin] (state) {
    return {
      ...state,
      isRequesting: true
    }
  },
  [scanner.receiveLogin] (state) {
    return {
      ...state,
      isRequesting: false,
      lastUpdated: Date.now()
    }
  },
  [scanner.succeedLogin] (state,{payload}) {
    return {
      ...state,
      error: null
    }
  },
  [scanner.failLogin] (state,{payload}) {
    return {
      ...state,
      error: payload
    }
  },
  [scanner.requestLogout] (state) {
    return {
      ...state,
      isRequesting: true
    }
  },
  [scanner.receiveLogout] (state) {
    return {
      ...state,
      isRequesting: false,
      lastUpdated: Date.now()
    }
  }
}, initialState)

export default reducer
