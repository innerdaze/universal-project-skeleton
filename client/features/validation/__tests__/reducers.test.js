import { reducer as validationReducers } from '../reducers'
import { validationAction } from '../operations'

let initialState = {}

describe('Testing on validation reducers', () => {
  test('Expect handle INVALIDATE', () => {
    let mockFieldID = 'foo'
    let mockError = 'bar'

    const returnedState = validationReducers(
      initialState,
      validationAction.invalidate(mockFieldID, mockError)
    )

    expect(returnedState[mockFieldID]).toEqual(mockError)
  })

  test('Expect handle VALIDATE', () => {
    let mockFieldID = 'foo'

    const returnedState = validationReducers(
      initialState,
      validationAction.validate(mockFieldID)
    )

    expect(returnedState[mockFieldID]).toBeNull()
  })
})
