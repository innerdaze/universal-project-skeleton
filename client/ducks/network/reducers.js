
import { combineReducers } from 'redux'
import { handleActions } from 'redux-actions'
import actions from './actions'
const { network } = actions
const initialState = {
    isNetFailOffline:false,
    isNetFailNoSession:false
}
debugger
const reducer = handleActions({
  [network.isNetFailOffline] (state) {
    return {
      ...state,
      isNetFailOffline: true
    }
  },
  [network.isNetFailNoSession] (state) {
    return {
      ...state,
      isNetFailNoSession: false
    }
  }
}, initialState)

export default reducer
