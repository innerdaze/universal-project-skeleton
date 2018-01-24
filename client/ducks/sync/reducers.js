
import { combineReducers } from 'redux'
import { handleActions } from 'redux-actions'
import actions from './actions'
const { sync } = actions
const initialState = {
  isSyncing: false,
  progress: 0
}
debugger
const reducer = handleActions({
  [sync.startSync] (state) {
    return {
      ...state,
      isSyncing: true
    }
  },
  [sync.endSync] (state) {
    return {
      ...state,
      isSyncing: false
    }
  },
  [sync.syncProgress] (state,{payload}) {
    return {
      ...state,
      progress: payload
    }
  }
}, initialState)

export default reducer
