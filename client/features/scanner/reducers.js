import { combineReducers } from 'redux'
import { handleActions } from 'redux-actions'
import actions from './actions'
const { scanner } = actions
const initialState = {
  isScanning: false,
  error: null
}
export const reducer = handleActions(
  {
    [scanner.startScanning](state) {
      return {
        ...state,
        isScanning: true
      }
    },
    [scanner.endScanning](state) {
      return {
        ...state,
        isScanning: false
      }
    }
  },
  initialState
)

export default reducer
