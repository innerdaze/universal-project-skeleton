import validationReducers from '../../features/validation/reducers'

describe('Testing on validation reducers', () => {
  test('Expect handle INVALIDATE', () => {
    let fieldID = 'foo'
    let error = 'bar'

    let action = {
      type: 'VALIDATION/INVALIDATE',
      payload: {
        fieldID,
        error
      }
    }

    let expectedState = {
      [fieldID]: error
    }

    expect(validationReducers({}, action)).toEqual(expectedState)
  })

  test('Expect handle VALIDATE', () => {
    let fieldID = 'foo'

    let action = {
      type: 'VALIDATION/VALIDATE',
      payload: {
        fieldID
      }
    }

    let expectedState = {
      [fieldID]: null
    }

    expect(validationReducers({}, action)).toEqual(expectedState)
  })
})
