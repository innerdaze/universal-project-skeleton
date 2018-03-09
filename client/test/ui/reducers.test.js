import uiReducers from '../../features/ui/reducers'

let initialState = {
  mainMenuVisible: false
}

describe('Testing on ui reducers', () => {
  test('Expect handle UI_SHOW_MENU', () => {
    let action = {
      type: 'UI/UI_SHOW_MENU'
    }

    let expectedState = {
      ...initialState,
      mainMenuVisible: true
    }

    expect(uiReducers(initialState, action)).toEqual(expectedState)
  })

  test('Expect handle UI_HIDE_MENU', () => {
    let action = {
      type: 'UI/UI_HIDE_MENU'
    }

    let expectedState = {
      ...initialState,
      mainMenuVisible: false
    }

    expect(uiReducers(initialState, action)).toEqual(expectedState)
  })
})
