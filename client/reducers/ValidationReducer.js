export default function validation(state = {}, action) {
  switch (action.type) {
    case 'INVALIDATE':
      return {
        ...state,
        [action.fieldID]: action.error
      }
    case 'VALIDATE':
      return {
        ...state,
        [action.fieldID]: null
      }
    default:
      return state
  }
}
