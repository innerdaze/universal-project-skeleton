import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { productOperations } from '../../features/product'
import productActions from '../../features/product/actions'
import { networkOperations } from '../../features/network'

let middlewares, mockStore, store

describe('Testing on product operations...', () => {
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

  describe('Test fetchProducts operations', () => {
    test('Expect requestProducts, callApiSpy and receiveProducts to be called', () => {
      let fetchProductsSpy = jest.spyOn(
        productActions.product,
        'requestProducts'
      )

      let callApiSpy = jest.spyOn(networkOperations, 'callApi')

      let receiveProductsSpy = jest.spyOn(
        productActions.product,
        'receiveProducts'
      )

      return store.dispatch(productOperations.fetchProducts()).then(() => {
        expect(fetchProductsSpy).toHaveBeenCalled()
        expect(callApiSpy).toHaveBeenCalled()
        expect(receiveProductsSpy).toHaveBeenCalled()
      })
    })
  })
})
