import { handleActions } from 'redux-actions'
import { ready } from './actions'

const initialState = {
  isReady: false
}

const reducer = handleActions(
  {
    [ready](state) {
      return {
        ...state,
        isReady: true
      }
    }
  },
  initialState
)

export default reducer
