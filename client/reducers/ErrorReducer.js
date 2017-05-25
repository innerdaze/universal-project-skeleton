export default function errors(state = {
  activeError: null
}, action) {
  switch (action.type) {
    case 'ERROR_DISPLAY':
      return {
        activeError: action.error
      }
    case 'ERROR_DISMISS':
      return {
        activeError: null
      }
    default:
      return state
  }
}
