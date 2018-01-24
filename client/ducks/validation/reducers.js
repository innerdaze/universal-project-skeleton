
import { handleActions } from 'redux-actions'
import actions from './actions'
const { validation } = actions
const initialState = {
  mainMenuVisible: false
}
debugger
const reducer = handleActions({
  [validation.invalidate] (state,{field,error}) {
    return {
      ...state,
      [field]: error
    }
  },
  [validation.validate] (state,{field}) {
    return {
      ...state,
      [field]: null
    }
  }
}, initialState)

export default reducer
