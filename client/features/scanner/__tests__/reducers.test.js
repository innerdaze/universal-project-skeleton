import { reducer as scannerReducers } from '../reducers'
import { scannerAction } from '../operations'

let initialState = {
  isScanning: false,
  error: null
}

describe('Testing on scanner reducers...', () => {
  test('Expect handle START_SCANNING', () => {
    const { isScanning } = scannerReducers(
      initialState,
      scannerAction.startScanning()
    )

    expect(isScanning).toEqual(true)
  })

  test('Expect handle END_SCANNING', () => {
    const { isScanning } = scannerReducers(
      initialState,
      scannerAction.endScanning()
    )

    expect(isScanning).toEqual(false)
  })
})
