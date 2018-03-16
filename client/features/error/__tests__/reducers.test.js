import errorReducers from '../reducers'
import operations from '../operations'
let initialState = {
  activeError: null
}

describe('Testing on error reducers', () => {
  test('Expect handle DISPLAY_ERROR', () => {
    let error = 'Error message'
const {displayError}=operations
const{activeError}=errorReducers(initialState,displayError(error))
expect(activeError).toEqual(error)
  })

  test('Expect handle DISMISS_ERROR', () => {
    const {dismissError}=operations
    const{activeError}=errorReducers(initialState,dismissError())
    expect(activeError).toEqual(null)
  })
})
