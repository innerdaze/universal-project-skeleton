
import { handleActions } from 'redux-actions'
import actions from './actions'
const { validation } = actions
const initialState = {
  mainMenuVisible: false
}
const reducer = handleActions({
  [validation.invalidate] (state,{payload:{field,error}}) {
    return {
      ...state,
      [field]: error
    }
  },
  [validation.validate] (state,{payload:{field}}) {
    return {
      ...state,
      [field]: null
    }
  }
}, initialState)

export default reducer
