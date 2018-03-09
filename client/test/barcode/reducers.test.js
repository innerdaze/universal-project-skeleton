import barcodeReducers from '../../features/barcode/reducers'

describe('Testing on barcode reducers', () => {
  describe('Test barcodeLookup reducer', () => {
    test('Expect handle LOOKUP_BARCODE', () => {
      let barcodeID = 'FOO'
      let action = {
        type: 'BARCODE/LOOKUP_BARCODE',
        payload: {
          barcodeID
        }
      }

      let expectedState = {
        barcodeID,
        lastError: null,
        lastQuery: barcodeID
      }

      expect(barcodeReducers({}, action).barcodeLookup).toEqual(expectedState)
    })

    test('Expect handle FAIL_LOOKUP_BARCODE', () => {
      let barcodeID = 'FOO'
      let action = {
        type: 'BARCODE/FAIL_LOOKUP_BARCODE',
        payload: {
          barcodeID
        }
      }

      let expectedState = {
        lastError: `No match for barcode: ${barcodeID}`,
        lastQuery: null
      }

      expect(barcodeReducers({}, action).barcodeLookup).toEqual(expectedState)
    })

    test('Expect handle SUCCEED_LOOKUP_BARCODE', () => {
      let action = {
        type: 'BARCODE/SUCCEED_LOOKUP_BARCODE'
      }

      let expectedState = {
        lastError: null,
        lastQuery: null
      }

      expect(barcodeReducers({}, action).barcodeLookup).toEqual(expectedState)
    })
  })
  describe('Test barcodes reducer', () => {
    test('Expect handle INVALIDATE_BARCODES', () => {
      let action = {
        type: 'BARCODE/INVALIDATE_BARCODES'
      }

      let expectedState = {
        didInvalidate: true,
        isFetching: false,
        lastUpdated: null,
        items: []
      }

      expect(barcodeReducers({}, action).barcodes).toEqual(expectedState)
    })

    test('Expect handle REQUEST_BARCODES', () => {
      let action = {
        type: 'BARCODE/REQUEST_BARCODES'
      }

      let expectedState = {
        didInvalidate: false,
        isFetching: true,
        lastUpdated: null,
        items: []
      }

      expect(barcodeReducers({}, action).barcodes).toEqual(expectedState)
    })

    test('Expect handle RECEIVE_BARCODES', () => {
      let action = {
        type: 'BARCODE/RECEIVE_BARCODES',
        payload: {
          json: [
            {
              Barcode: 1,
              Deleted: false
            },
            {
              Barcode: 2,
              Deleted: true
            },
            {
              Barcode: 3,
              Deleted: false
            }
          ]
        }
      }

      let expectedState = {
        didInvalidate: false,
        isFetching: false,
        lastUpdated: null,
        items: [1, 3],
        lastUpdated: expect.any(Number)
      }

      expect(barcodeReducers({}, action).barcodes).toEqual(expectedState)
    })

    test('Expect handle RESET_BARCODES', () => {
      let action = {
        type: 'BARCODE/RESET_BARCODES'
      }

      let expectedState = {
        isFetching: false,
        didInvalidate: false,
        lastUpdated: null,
        items: []
      }

      expect(barcodeReducers({}, action).barcodes).toEqual(expectedState)
    })
  })

  describe('Test barcodeEntities reducer', () => {
    test('Expect handle RECEIVE_BARCODES', () => {
      let json = [
        {
          Barcode: 1,
          Deleted: true
        },
        {
          Barcode: 2,
          Deleted: false
        },
        {
          Barcode: 3,
          Deleted: true
        },
        {
          Barcode: 4,
          Deleted: false
        }
      ]

      let action = {
        type: 'BARCODE/RECEIVE_BARCODES',
        payload: {
          json
        }
      }

      let expectedValue = {
        '2': {
          Barcode: 2,
          Deleted: false
        },
        '4': {
          Barcode: 4,
          Deleted: false
        }
      }

      expect(barcodeReducers({}, action).barcodeEntities).toEqual(expectedValue)
    })
  })

  describe('Test barcodeIDsByProductID reducer', () => {
    test('Expect handle RECEIVE_BARCODES', () => {
      let json = [
        {
          Barcode: 1,
          ProductID: 'Foo1',
          Deleted: true
        },
        {
          Barcode: 2,
          ProductID: 'Foo2',
          Deleted: false
        },
        {
          Barcode: 3,
          ProductID: 'Foo3',
          Deleted: true
        },
        {
          Barcode: 4,
          ProductID: 'Foo4',
          Deleted: false
        }
      ]

      let action = {
        type: 'BARCODE/RECEIVE_BARCODES',
        payload: {
          json
        }
      }

      let expectedValue = { Foo2: 2, Foo4: 4 }

      expect(barcodeReducers({}, action).barcodeIDsByProductID).toEqual(
        expectedValue
      )
    })

    test('Expect handle RESET_BARCODES', () => {
      let action = {
        type: 'BARCODE/RESET_BARCODES'
      }

      let expectedValue = {}

      expect(barcodeReducers({}, action).barcodeIDsByProductID).toEqual(
        expectedValue
      )
    })
  })
})
