export default function scanner(state = {
  isScanning: false,
  error: null
}, action) {
  switch (action.type) {
    case 'START_SCANNING':
      return {
        isScanning: true
      }
    case 'END_SCANNING':
      return {
        isScanning: false
      }
    default:
      return state
  }
}
