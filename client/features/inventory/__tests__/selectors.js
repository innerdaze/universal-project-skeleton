import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import * as selectors from '../selectors'

const middlewares = [thunk]

const mockStore = configureMockStore(middlewares)

describe('INVENTORY/SELECTORS', () => {
  test('barcode to product lookup works', () => {
    const mockProduct = {
      ProductID: 'ABC'
    }

    const store = mockStore({
      product: {
        productEntities: {
          ABC: mockProduct
        }
      },
      barcode: {
        barcodeEntities: {
          1234: {
            Barcode: 1234,
            ProductID: 'ABC'
          }
        }
      }
    })

    const product = selectors.productByBarcodeSelector(store.getState(), 1234)

    expect(product).toEqual(mockProduct)
  })
})
