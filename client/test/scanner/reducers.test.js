import scannerReducers from '../../features/scanner/reducers'

let initialState = {
  isScanning: false,
  error: null
}

describe('Testing on scanner reducers...', () => {
  test('Expect handle START_SCANNING', () => {
    let action = {
      type: 'SCANNER/START_SCANNING'
    }

    expect(scannerReducers({}, action)).toHaveProperty('isScanning', true)
  })

  test('Expect handle END_SCANNING', () => {
    let action = {
      type: 'SCANNER/END_SCANNING'
    }

    expect(scannerReducers({}, action)).toHaveProperty('isScanning', false)
  })
})
