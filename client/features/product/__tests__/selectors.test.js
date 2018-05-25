import { productSelectors } from '../'
import genricSelector from '../../app/__test__/genericSelectorsTest'
const testSelector = genricSelector.testSelector
const testReselectorWithLogic = genricSelector.expectValue
const mockParameters = {
  barcode: {
    barcodeLookup: { lastError: null }
  }
}
const mockParametersLastMatches = {
  product: {
    productSearch: {
      lastMatches: {
        0: {
          AvgSales: 0,
          CurrStock: 0,
          DimID: 0,
          OnOrder: 0,
          PackSize: '',
          ProductID: 2,
          ProductName: 'VJK  Eau de 100 ml (herra)',
          SaleUOM: 0,
          SaleUnitID: 'PCS',
          SellingPrice: 5
        }
      }
    }
  }
}
const mockParametersProductEntitiesSelector = {
  product: {
    productEntities: {
      2: {
        ProductID: 2,
        SellingPrice: 10
      }
    }
  }
}
const mockParametersPriceByProductIdSelector = {
  product: {
    productEntities: {
      2: {
        ProductID: 2,
        SellingPrice: 10
      }
    }
  }
}
describe('product Selectors', () => {
  testSelector({
    selector: productSelectors.lastMatches,
    state: mockParametersLastMatches,
    key: 'lastMatches',
    xpath: 'product.productSearch'
  })

  testSelector({
    selector: productSelectors.productEntitiesSelector,
    state: mockParametersProductEntitiesSelector,
    key: 'productEntities',
    xpath: 'product'
  })
  testReselectorWithLogic(
    productSelectors.priceByProductIdSelector(
      mockParametersPriceByProductIdSelector,
      2
    ),
    10,
    'priceByProductIdSelector'
  )
  // for undefined
  describe('priceByProductIdSelector => for undefined', () => {
    testReselectorWithLogic(
      productSelectors.priceByProductIdSelector(
        mockParametersPriceByProductIdSelector,
        5
      ),
      undefined
    )
  })
})
