export default function sync(state = {
  isSyncing: false,
  progress: 0
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
    case 'SYNC_PROGRESS':
      return {
        ...state,
        progress: action.progress
      }
    default:
      return state
  }
}
