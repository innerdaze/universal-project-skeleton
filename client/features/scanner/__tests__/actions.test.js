import scannerActions from '../actions'
import scannerReducers from '../reducers'

describe('Testing on scanner actions', () => {
  test.skip('Test on foundBarcode', () => {
    let data = {}
    let expectedAction = {
      type: 'SCANNER/FOUND_BARCODE',
      payload: {
        data
      }
    }
    expect(scannerActions.scanner.foundBarcode(data)).toEqual(expectedAction)
  })
})
