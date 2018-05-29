import { priceByBarcodeSelector } from '../selectors'

test('priceByBarcodeSelector ➤ Using barcode price', () => {
  const state = {
    barcode: {
      barcodeEntities: {
        1: {
          Barcode: '1',
          ProductID: '2',
          SellingPrice: 5
        }
      }
    },
    product: {
      productEntities: {
        2: {
          ProductID: '2',
          SellingPrice: 10
        }
      }
    }
  }

  expect(priceByBarcodeSelector(state, 1)).toEqual(5)
})

test('priceByBarcodeSelector ➤ Using product price', () => {
  const state = {
    barcode: {
      barcodeEntities: {
        1: {
          Barcode: '1',
          ProductID: '2',
          SellingPrice: 0
        }
      }
    },
    product: {
      productEntities: {
        2: {
          ProductID: '2',
          SellingPrice: 10
        }
      }
    }
  }

  expect(priceByBarcodeSelector(state, 1)).toEqual(10)
})

test('priceByBarcodeSelector ➤ No match for barcode', () => {
  const state = {
    barcode: {
      barcodeEntities: {}
    },
    product: {
      productEntities: {}
    }
  }

  expect(priceByBarcodeSelector(state, 1)).toEqual(undefined)
})
