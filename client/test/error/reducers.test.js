import errorReducers from '../../features/error/reducers'

let initialState = {
  activeError: null
}

describe('Testing on error reducers', () => {
  test('Expect handle DISPLAY_ERROR', () => {
    let error = 'Error message'
    let action = {
      type: 'ERROR/DISPLAY_ERROR',
      payload: {
        error
      }
    }

    let expectedState = {
      ...initialState,
      activeError: error
    }

    expect(errorReducers({}, action)).toEqual(expectedState)
  })

  test('Expect handle DISMISS_ERROR', () => {
    let action = {
      type: 'ERROR/DISMISS_ERROR'
    }

    let expectedState = {
      ...initialState,
      activeError: null
    }

    expect(errorReducers({}, action)).toEqual(expectedState)
  })
})
