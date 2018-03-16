import { reducer as uiReducers } from '../reducers'
import { uiShowMenu, uiHideMenu } from '../operations'

let initialState = {
  mainMenuVisible: false
}

describe('Testing on ui reducers', () => {
  test('Expect handle UI_SHOW_MENU', () => {
    const { mainMenuVisible } = uiReducers(initialState, uiShowMenu())

    expect(mainMenuVisible).toEqual(true)
  })

  test('Expect handle UI_HIDE_MENU', () => {
    const { mainMenuVisible } = uiReducers(initialState, uiHideMenu())

    expect(mainMenuVisible).toEqual(false)
  })
})
