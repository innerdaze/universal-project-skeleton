import barcodeActions from '../../barcode/actions'

describe('Testing on barcode actions', () => {
  test('Test receiveBarcodes', () => {
    let json = { foo: 'bar' }
    let expectedAction = {
      type: 'BARCODE/RECEIVE_BARCODES',
      payload: {
        json
      }
    }
    expect(barcodeActions.barcode.receiveBarcodes(json)).toEqual(expectedAction)
  })

  test('Test lookupBarcode', () => {
    let barcodeID = 'FOO'
    let expectedAction = {
      type: 'BARCODE/LOOKUP_BARCODE',
      payload: {
        barcodeID
      }
    }
    expect(barcodeActions.barcode.lookupBarcode(barcodeID)).toEqual(
      expectedAction
    )
  })

  test('Test succeedLookupBarcode', () => {
    let barcodeID = 'FOO'
    let expectedAction = {
      type: 'BARCODE/SUCCEED_LOOKUP_BARCODE',
      payload: {
        barcodeID
      }
    }
    expect(barcodeActions.barcode.succeedLookupBarcode(barcodeID)).toEqual(
      expectedAction
    )
  })

  test('Test failLookupBarcode', () => {
    let barcodeID = 'FOO'
    let expectedAction = {
      type: 'BARCODE/FAIL_LOOKUP_BARCODE',
      payload: {
        barcodeID
      }
    }
    expect(barcodeActions.barcode.failLookupBarcode(barcodeID)).toEqual(
      expectedAction
    )
  })
})
