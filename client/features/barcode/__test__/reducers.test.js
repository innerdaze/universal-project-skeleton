import {
  barcodeLookup as barcodeLookupReducer,
  barcodes as barcodesReducer,
  barcodeEntities as barcodeEntitiesReducer,
  barcodeIDsByProductID as barcodeIDsByProductIDReducer
} from '../reducers'
import operations from '../operations'
import {
  generatebarcodeModel,
  generatebarcodeModelArray
} from '../__fixtures__'
import { pluck, indexBy, prop } from 'ramda'
const initialStateBarcodeLookup = {
  lastQuery: null,
  lastError: null
}
const initialStateBarcode = {
  isFetching: false,
  didInvalidate: false,
  lastUpdated: null,
  items: []
}
describe('Testing on barcode reducers', () => {
  describe('Test barcodeLookup reducer', () => {
    test('Expect handle LOOKUP_BARCODE', () => {
      const { lookupBarcode } = operations
      const generatebarcodeModelFixture = generatebarcodeModel()
      const { barcodeID, lastQuery } = barcodeLookupReducer(
        initialStateBarcodeLookup,
        lookupBarcode(generatebarcodeModelFixture.barcodeID)
      )
      expect(barcodeID).not.toBeNull()
      expect(lastQuery).toEqual(generatebarcodeModelFixture.barcodeID)
    })

    test('Expect handle FAIL_LOOKUP_BARCODE', () => {
      const { failLookupBarcode } = operations
      const generatebarcodeModelFixture = generatebarcodeModel()
      const { lastError } = barcodeLookupReducer(
        initialStateBarcodeLookup,
        failLookupBarcode(generatebarcodeModelFixture.barcodeID)
      )
      expect(lastError).toEqual(
        `No match for barcode: ${generatebarcodeModelFixture.barcodeID}`
      )
    })

    test('Expect handle SUCCEED_LOOKUP_BARCODE', () => {
      const { succeedLookupBarcode } = operations
      const generatebarcodeModelFixture = generatebarcodeModel()
      const { lastError } = barcodeLookupReducer(
        initialStateBarcodeLookup,
        succeedLookupBarcode()
      )
      expect(lastError).toEqual(null)
    })
  })
  describe('Test barcodes reducer', () => {
    test('Expect handle INVALIDATE_BARCODES', () => {
      const { invalidateBarcodes } = operations
      const { didInvalidate } = barcodesReducer(
        initialStateBarcode,
        invalidateBarcodes()
      )
      expect(didInvalidate).toEqual(true)
    })

    test('Expect handle REQUEST_BARCODES', () => {
      const { requestBarcodes } = operations
      const { isFetching, didInvalidate } = barcodesReducer(
        initialStateBarcode,
        requestBarcodes()
      )
      expect(isFetching).toEqual(true)
      expect(didInvalidate).toEqual(false)
    })

    test('Expect handle RECEIVE_BARCODES', () => {
      const { receiveBarcodes } = operations
      const generatebarcodeModelFixture = generatebarcodeModel()
      const { isFetching, didInvalidate, items, lastUpdated } = barcodesReducer(
        initialStateBarcode,
        receiveBarcodes(generatebarcodeModelFixture.json)
      )
      expect(isFetching).toEqual(false)
      expect(didInvalidate).toEqual(false)
      expect(items).toEqual([1, 3])
    })

    test('Expect handle RESET_BARCODES', () => {
      const { resetBarcodes } = operations
      const { items } = barcodesReducer(initialStateBarcode, resetBarcodes())
      expect(items).toEqual([])
    })
  })

  describe('Test barcodeEntities reducer', () => {
    test('Expect handle RECEIVE_BARCODES', () => {
      var excepcted = {
        '2': {
          Barcode: 2,
          Deleted: false
        },
        '4': {
          Barcode: 4,
          Deleted: false
        }
      }
      const { receiveBarcodes } = operations
      const generatebarcodeModelFixture = generatebarcodeModel()
      const expectedValue = barcodeEntitiesReducer(
        initialStateBarcode,
        receiveBarcodes(generatebarcodeModelFixture.jsonBarcodeEntities)
      )
      expect(expectedValue).toEqual(excepcted)
    })
  })

  describe('Test barcodeIDsByProductID reducer', () => {
    test('Expect handle RECEIVE_BARCODES', () => {
      const { receiveBarcodes } = operations
      let expectedValue = { Foo2: 2, Foo4: 4 }
      const generatebarcodeModelFixture = generatebarcodeModel()
      const valuesInResponse = barcodeIDsByProductIDReducer(
        initialStateBarcode,
        receiveBarcodes(generatebarcodeModelFixture.receiveBarcodeJson)
      )
      expect(valuesInResponse).toEqual(expectedValue)
    })

    test('Expect handle RESET_BARCODES', () => {
      const { resetBarcodes } = operations
      const valuesInResponse = barcodeIDsByProductIDReducer(
        initialStateBarcode,
        resetBarcodes()
      )
      expect(valuesInResponse).toEqual({})
    })
  })
})
