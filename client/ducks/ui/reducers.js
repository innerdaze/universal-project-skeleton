
import { combineReducers } from 'redux'
import { handleActions } from 'redux-actions'
import actions from './actions'
const { sync } = actions
const initialState = {
  mainMenuVisible: false
}
debugger
const reducer = handleActions({
  [sync.uiShowMenu] (state) {
    return {
      ...state,
      mainMenuVisible: true
    }
  },
  [sync.uiHideMenu] (state) {
    return {
      ...state,
      mainMenuVisible: false
    }
  }
}, initialState)

export default reducer
