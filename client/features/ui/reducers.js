import { combineReducers } from 'redux'
import { handleActions } from 'redux-actions'
import actions from './actions'
const { ui } = actions
const initialState = {
  mainMenuVisible: false
}
export const reducer = handleActions(
  {
    [ui.uiShowMenu](state) {
      return {
        ...state,
        mainMenuVisible: true
      }
    },
    [ui.uiHideMenu](state) {
      return {
        ...state,
        mainMenuVisible: false
      }
    }
  },
  initialState
)

export default reducer
