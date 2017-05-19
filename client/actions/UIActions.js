import {
  UI_SHOW_MENU,
  UI_HIDE_MENU
} from '../constants/ActionTypes'

export function uiShowMenu() {
  return {
    type: UI_SHOW_MENU
  }
}

export function uiHideMenu() {
  return {
    type: UI_HIDE_MENU
  }
}
