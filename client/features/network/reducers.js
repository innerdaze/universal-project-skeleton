import { combineReducers } from 'redux'
import { handleActions } from 'redux-actions'
import actions from './actions'
const { network } = actions
const initialState = {
  isNetFailOffline: false,
  isNetFailNoSession: false,
  isOffline: false
}

const reducer = handleActions(
  {
    [network.netFailOffline](state) {
      return {
        ...state,
        isNetFailOffline: true
      }
    },
    [network.netFailNoSession](state) {
      return {
        ...state,
        isNetFailNoSession: false
      }
    },
    [network.setIsOffline](
      state,
      {
        payload: { flag }
      }
    ) {
      return {
        ...state,
        isOffline: flag
      }
    }
  },
  initialState
)

export default reducer
