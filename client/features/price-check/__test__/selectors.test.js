import { priceCheckSelectors } from '../'
import genricSelector from '../../app/__test__/genericSelectorsTest'
const testReselectorWithLogic = genricSelector.expectValue
const testSelector = genricSelector.testSelector

const mockParametersErrorSelector = {
  priceCheck: {
    error: null
  }
}
const mockParametersIsGettingPriceSelector = {
  priceCheck: {
    isGettingPrice: true
  }
}
const mockParametersIsUpdatingPriceSelector = {
  priceCheck: {
    isUpdatingPrice: true
  }
}
const mockParametersLastPriceCheckSelector = {
  priceCheck: {
    lastPriceCheck: true
  }
}
const mockParametersCurrentContextSelector = {
  priceCheck: {
    currentContext: null
  }
}
const mockParametersPriceUpdateIntentSelector = {
  priceCheck: {
    priceUpdateIntent: null
  }
}
const mockParametersByIdSelector = {
  priceCheck: {
    byId: {}
  }
}
const mockParametersChangingOrderQuantityFor = {
  order: {
    orders: {
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
  }
}

// const mockParametersMode = {
//   order: {
//     orders: {
//       mode: 99
//     }
//   }
// }
const mockParametersCreatePriceCheckModelForProductIdSelector = {
  product: {
    productEntities: {
      2: {
        ProductID: 2,
        SellingPrice: 10,
        ProductName: 'VJK Deodorant'
      }
    }
  }
}
// const mockParameterPendingOrdersBySelectedModeSelector = {
//   order: {
//     orders: {
//       unprocessedItems: ['d183807c-4e18-49e4-b718-039265ecd107'],
//       mode: 99
//     },
//     orderEntities: {
//       'd183807c-4e18-49e4-b718-039265ecd107': {
//         ProductID: 1,
//         Barcode: 1,
//         TransType: 20
//       }
//     }
//   }
// }

describe('price-check Selectors', () => {
  testSelector({
    selector: priceCheckSelectors.errorSelector,
    state: mockParametersErrorSelector,
    key: 'error',
    xpath: 'priceCheck'
  })

  testSelector({
    selector: priceCheckSelectors.isGettingPriceSelector,
    state: mockParametersIsGettingPriceSelector,
    key: 'isGettingPrice',
    xpath: 'priceCheck'
  })
  testSelector({
    selector: priceCheckSelectors.isUpdatingPriceSelector,
    state: mockParametersIsUpdatingPriceSelector,
    key: 'isUpdatingPrice',
    xpath: 'priceCheck'
  })
  testSelector({
    selector: priceCheckSelectors.lastPriceCheckSelector,
    state: mockParametersLastPriceCheckSelector,
    key: 'lastPriceCheck',
    xpath: 'priceCheck'
  })
  testSelector({
    selector: priceCheckSelectors.currentContextSelector,
    state: mockParametersCurrentContextSelector,
    key: 'currentContext',
    xpath: 'priceCheck'
  })
  testSelector({
    selector: priceCheckSelectors.priceUpdateIntentSelector,
    state: mockParametersPriceUpdateIntentSelector,
    key: 'priceUpdateIntent',
    xpath: 'priceCheck'
  })
  testSelector({
    selector: priceCheckSelectors.byIdSelector,
    state: mockParametersByIdSelector,
    key: 'byId',
    xpath: 'priceCheck'
  })

  testReselectorWithLogic(
    priceCheckSelectors.createPriceCheckModelForProductIdSelector(
      mockParametersCreatePriceCheckModelForProductIdSelector,
      2
    ),
    {
      CaseQty: 0,
      CostPrice: 0,
      Description: 'VJK Deodorant',
      Margin: 0,
      POSPrice: 0,
      SellingPrice: 0,
      SupplierName: '',
      SupplierPID: ''
    },
    'createPriceCheckModelForProductIdSelector'
  )
  //for undefined
  testReselectorWithLogic(
    priceCheckSelectors.createPriceCheckModelForProductIdSelector(
      mockParametersCreatePriceCheckModelForProductIdSelector,
      1
    ),
    undefined,
    'createPriceCheckModelForProductIdSelectorUndefined'
  )
})
