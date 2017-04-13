export default function sync(state = {
  isSyncing: false
}, action) {
  switch (action.type) {
    case 'START_SYNC':
      return {
        ...state,
        isSyncing: true
      }
    case 'END_SYNC':
      return {
        ...state,
        isSyncing: false
      }
    default:
      return state
  }
}
