import actions from './actions'
const errorAction = actions.error
const displayError = error => {
  return dispatch => {
    dispatch(errorAction.errorDisplay(error))
  }
}
const dismissError = () => {
  return dispatch => {
    dispatch(errorAction.errorDismiss())
  }
}
export default {
  dismissError,
  displayError
}
