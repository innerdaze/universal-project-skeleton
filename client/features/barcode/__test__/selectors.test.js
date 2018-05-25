import { barcodeSelectors } from '../'
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
const mockParametersForPrice = {
  barcode: {
    barcodeEntities: {
      1: {
        Barcode: 1,
        ProductID: 2,
        SellingPrice: 5
      }
    }
  },
  product: {
    productEntities: {
      2: {
        ProductID: 2,
        SellingPrice: 10
      }
    }
  }
}

describe('barcode Selectors', () => {
  testSelector({
    selector: barcodeSelectors.lastError,
    state: mockParameters,
    key: 'lastError',
    xpath: 'barcode.barcodeLookup'
  })

  testSelector({
    selector: barcodeSelectors.barcodeEntitiesSelector,
    state: mockParametersEntity,
    key: 'barcodeEntities',
    xpath: 'barcode'
  })
  testReselectorWithLogic(
    barcodeSelectors.priceByBarcodeSelector(mockParametersForPrice, 1),
    5,
    'priceByBarcode'
  )
  // multiple tests
  describe('for undefined', () => {
    testReselectorWithLogic(
      barcodeSelectors.priceByBarcodeSelector(mockParametersForPrice, 5),
      undefined
    )
  })
})
