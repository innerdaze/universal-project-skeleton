import validationActions from '../../features/validation/actions'

describe('Testing on validation actions...', () => {
  test('Test on invalidate', () => {
    let fieldID = 'foo'
    let error = 'bar'

    let expectedAction = {
      type: 'VALIDATION/INVALIDATE',
      payload: {
        fieldID,
        error
      }
    }

    expect(validationActions.validation.invalidate(fieldID, error)).toEqual(
      expectedAction
    )
  })

  test('Test on validate', () => {
    let fieldID = 'foo'

    let expectedAction = {
      type: 'VALIDATION/VALIDATE',
      payload: {
        fieldID
      }
    }

    expect(validationActions.validation.validate(fieldID)).toEqual(
      expectedAction
    )
  })
})
