import { combineReducers } from 'redux'
import { handleActions } from 'redux-actions'
import actions from './actions'

const { error } = actions
const initialState = {
  activeError: null
}

const reducer = handleActions(
  {
    [error.displayError](state, { payload: { error } }) {
      return {
        ...state,
        activeError: error
      }
    },
    [error.dismissError](state) {
      return {
        ...state,
        activeError: null
      }
    }
  },
  initialState
)

export default reducer
