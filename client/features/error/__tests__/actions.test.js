import errorActions from '../actions'

describe('Testing on error actions', () => {
  test('Test displayError', () => {
    let error = 'Error message'
    let expectedAction = {
      type: 'ERROR/DISPLAY_ERROR',
      payload: {
        error
      }
    }
    expect(errorActions.error.displayError(error)).toEqual(expectedAction)
  })
})
