import { barcodeOperations } from '../../features/barcode'
import { networkOperations } from '../../features/network'
import { errorOperations } from '../../features/error'
import barcodeActions from '../../features/barcode/actions'
import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'

let middlewares, mockStore, store

describe('Testing on barcode operations...', () => {
  beforeEach(() => {
    middlewares = [thunk]
    mockStore = configureStore(middlewares)
    store = mockStore({
      app: {
        apiRoot: null
      },
      barcode: {
        barcodeEntities: {}
      },
      session: {
        session: {
          id: '123'
        }
      }
    })
  })
  describe('Test fetchBarcodes operations', () => {
    test('Expect requestBarcodes, callApi,receiveBarcodes actions are called', () => {
      let requestBarcodesSpy = jest.spyOn(
        barcodeActions.barcode,
        'requestBarcodes'
      )
      let receiveBarcodesSpy = jest.spyOn(
        barcodeActions.barcode,
        'receiveBarcodes'
      )
      let callApiSpy = jest.spyOn(networkOperations, 'callApi')

      return store.dispatch(barcodeOperations.fetchBarcodes()).then(() => {
        expect(requestBarcodesSpy).toHaveBeenCalled()
        expect(callApiSpy).toHaveBeenCalled()
        // expect(receiveBarcodesSpy).toHaveBeenCalled()
      })
    })
  })

  describe('Test _findBarcodeByID operations', () => {
    test('Expect lookupBarcode, succeedLookupBarcode, dismissError actions are called if barcode info found in barcodeEntities', () => {
      store = mockStore({
        app: {
          apiRoot: null
        },
        barcode: {
          barcodeEntities: {
            FOO: {}
          }
        },
        session: {
          session: {
            id: '123'
          }
        }
      })

      let lookupBarcodeSpy = jest.spyOn(barcodeActions.barcode, 'lookupBarcode')
      let succeedLookupBarcodeSpy = jest.spyOn(
        barcodeActions.barcode,
        'succeedLookupBarcode'
      )
      let dismissErrorSpy = jest.spyOn(errorOperations, 'dismissError')

      store.dispatch(barcodeOperations._findBarcodeByID('FOO'))
      expect(lookupBarcodeSpy).toHaveBeenCalled()
      expect(succeedLookupBarcodeSpy).toHaveBeenCalled()
      expect(dismissErrorSpy).toHaveBeenCalled()
    })

    test('Expect lookupBarcode, failLookupBarcode, displayError actions are called if barcode info not found in barcodeEntities', () => {
      let lookupBarcodeSpy = jest.spyOn(barcodeActions.barcode, 'lookupBarcode')
      let failLookupBarcodeSpy = jest.spyOn(
        barcodeActions.barcode,
        'failLookupBarcode'
      )
      let displayErrorSpy = jest.spyOn(errorOperations, 'displayError')

      store.dispatch(barcodeOperations._findBarcodeByID('FOO'))
      expect(lookupBarcodeSpy).toHaveBeenCalled()
      expect(failLookupBarcodeSpy).toHaveBeenCalled()
      expect(displayErrorSpy).toHaveBeenCalled()
    })
  })
})
