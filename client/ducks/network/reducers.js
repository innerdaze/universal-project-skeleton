
import { combineReducers } from 'redux'
import { handleActions } from 'redux-actions'
import { network } from './actions'

const initialState = {
    isNetFailOffline:false,
    isNetFailNoSession:false
}
debugger
const reducer = handleActions({
  [network.netFailOffline] (state) {
    return {
      ...state,
      isNetFailOffline: true
    }
  },
  [network.netFailNoSession] (state) {
    return {
      ...state,
      isNetFailNoSession: false
    }
  }
}, initialState)

export default reducer
