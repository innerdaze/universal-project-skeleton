export default function sync(state = {
  mainMenuVisible: false
}, action) {
  switch(action.type) {
    case 'UI_SHOW_MENU':
      return {
        ...state,
        mainMenuVisible: true
      }
    case 'UI_HIDE_MENU':
      return {
        ...state,
        mainMenuVisible: false
      }
    default:
      return state
  }
}
