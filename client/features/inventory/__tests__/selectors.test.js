import { inventorySelectors } from '../'
import genricSelector from '../../app/__test__/genericSelectorsTest'
const testSelector = genricSelector.testSelector
const testReselectorWithLogic = genricSelector.expectValue
const mockParameters = {
  barcode: {
    barcodeLookup: { lastError: null }
  }
}
const mockParametersEntity = {
  barcode: {
    barcodeEntities: {
      1: {
        Barcode: 1,
        ProductID: 1,
        SellingPrice: 5
      },
      2: {
        Barcode: 2,
        ProductID: 1
      }
    }
  }
}
const mockParametersForProductByBarcodeSelector = {
  order: {
    orderEntities: {
      'd183807c-4e18-49e4-b718-039265ecd107': {
        ProductID: 1,
        Barcode: 1,
        TransType: 20
      }
    },
    orders: {
      processedItems: [],
      unprocessedItems: ['d183807c-4e18-49e4-b718-039265ecd107'],
      mode: 20,
      changingOrderQuantityFor: {
        AreaID: '0',
        Barcode: 1,
        ProductID: 1,
        ProductName: 'VJK Deodorant',
        Qty: 1,
        TermianlID: undefined,
        TransType: 10,
        UserID: '1'
      }
    }
  },
  product: {
    productEntities: {
      1: {
        ProductID: 1,
        SellingPrice: 10
      }
    }
  },
  barcode: {
    barcodeEntities: {
      1: {
        Barcode: 1,
        ProductID: 1,
        SellingPrice: 5
      },
      2: {
        Barcode: 2,
        ProductID: 1,
        SellingPrice: 5
      }
    }
  }
}
describe('inventory Selectors', () => {
  // testReselectorWithLogic(
  //   productByBarcodeSelector(mockParametersForProductByBarcodeSelector, 1),
  //   [],
  //   'productByBarcodeSelector'
  // )
  testReselectorWithLogic(
    inventorySelectors.pendingOrdersBySelectedModeWithProductsSelector(
      mockParametersForProductByBarcodeSelector
    ),
    [
      {
        ProductID: 1,
        Barcode: 1,
        TransType: 20,
        product: {
          ProductID: 1,
          SellingPrice: 10
        }
      }
    ],
    'productByBarcode'
  )
  testReselectorWithLogic(
    inventorySelectors.pendingOrdersBySelectedModeWithProductsReversedSelector(
      mockParametersForProductByBarcodeSelector
    ),
    [
      {
        ProductID: 1,
        Barcode: 1,
        TransType: 20,
        product: {
          ProductID: 1,
          SellingPrice: 10
        }
      }
    ],
    'productByBarcodeReversed'
  )
  testReselectorWithLogic(
    inventorySelectors.currentlyChangeQuantityForWithProductSelector(
      mockParametersForProductByBarcodeSelector
    ),
    mockParametersForProductByBarcodeSelector.order.orders
      .changingOrderQuantityFor,
    'productByBarcodeReversed'
  )
  // describe('inventory Selectors', () => {
  //   testReselectorWithLogic(
  //     inventorySelectors.pendingOrdersBySelectedModeWithProductsReversedSelector(
  //       mockParametersForProductByBarcodeSelector
  //     ),
  //     [],
  //     'productByBarcode'
  //   )
  // it('should return 10 as expected value', () => {
  //   const SellingPrice = barcodeSelectors.priceByBarcodeSelector(
  //     mockParametersForPrice,
  //     1
  //   )
  //   expect(SellingPrice).toEqual(5)
  // })

  // testSelector({
  //   selector: barcodeSelectors,
  //   state: mockParameters,
  //   key: 'SellingPrice',
  //   xpath: 'product.SellingPrice',
  //   selectorKey: 'priceByBarcodeSelector'
  // })
})

// describe('INVENTORY/SELECTORS', () => {
//   test('barcode to product lookup works', () => {
//     const mockProduct = {
//       ProductID: 'ABC'
//     }

//     const store = mockStore({
//       product: {
//         productEntities: {
//           ABC: mockProduct
//         }
//       },
//       barcode: {
//         barcodeEntities: {
//           1234: {
//             Barcode: 1234,
//             ProductID: 'ABC'
//           }
//         }
//       }
//     })

//     const product = selectors.productByBarcodeSelector(store.getState(), 1234)

//     expect(product).toEqual(mockProduct)
//   })
// })
