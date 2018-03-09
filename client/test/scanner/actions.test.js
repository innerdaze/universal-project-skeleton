import scannerActions from '../../features/scanner/actions'
import scannerReducers from '../../features/scanner/reducers'

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
