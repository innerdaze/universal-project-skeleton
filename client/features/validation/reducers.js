
import { handleActions } from 'redux-actions'
import actions from './actions'
const { validation } = actions
const initialState = {
}
const reducer = handleActions({
  [validation.invalidate] (state,{payload:{fieldID,error}}) {
    return {
      ...state,
      [fieldID]: error
    }
  },
  [validation.validate] (state,{ payload: {fieldID} }) {
    return {
      ...state,
      [fieldID]: null
    }
  }
}, initialState)

export default reducer
