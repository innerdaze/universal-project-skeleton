import { wastageSelectors } from '../'
import genricSelector from '../../app/__test__/genericSelectorsTest'
const testSelector = genricSelector.testSelector
const testReselectorWithLogic = genricSelector.expectValue
const mockParameters = {
  barcode: {
    barcodeLookup: { lastError: null }
  }
}
const mockParametersWastageTypeToOrderMapSelector = {
  wastage: {
    wastageTypeToOrderMap: {
      '8a585dc5-85f4-457b-a4a9-1aed774996d5': '02',
      '8d68bdce-5e1c-4597-814f-7a3436f8718e': '02',
      '18b3d456-b564-45f3-8961-848541bb8cb9': '02',
      '637d8207-e462-4731-937f-de094128e570': '02',
      '2935141e-4245-4800-8782-03776bb0496f': '02'
    }
  }
}
const mockParametersIsProcessingSelector = {
  wastage: {
    wastageProcessing: {
      isProcessing: true
    }
  }
}
const mockParametersIsChangingWastageTypeSelector = {
  wastage: {
    wastageEntities: {
      isChangingWastageType: true
    }
  }
}
const mockParametersChangingWastageTypeForSelector = {
  wastage: {
    wastageEntities: {
      changingWastageTypeFor: true
    }
  }
}
const mockParametersWastageTypesByIdSelector = {
  wastage: {
    wastageTypes: {
      byId: {
        '01': {
          Name: 'Damaged',
          TypeID: '01'
        }
      },
      allIds: ['01']
    }
  }
}
const mockParametersWastageTypesByIdSelectorForUndefined = {
  wastage: {
    wastageTypes: {
      byId: {
        '01': {
          Name: 'Damaged',
          TypeID: '01'
        }
      },
      allIds: ['02']
    }
  }
}
const mockParametersWastageTypeForOrderIdSelector = {
  wastage: {
    wastageTypeToOrderMap: {
      '8a585dc5-85f4-457b-a4a9-1aed774996d5': '01',
      '8d68bdce-5e1c-4597-814f-7a3436f8718e': '02',
      '18b3d456-b564-45f3-8961-848541bb8cb9': '02',
      '637d8207-e462-4731-937f-de094128e570': '02',
      '2935141e-4245-4800-8782-03776bb0496f': '02'
    },
    wastageTypes: {
      byId: {
        '01': {
          Name: 'Damaged',
          TypeID: '01'
        }
      }
    }
  }
}
const mockParametersWastageEntitiesSelector = {
  order: {
    orders: {
      unprocessedItems: ['d183807c-4e18-49e4-b718-039265ecd107'],
      mode: 20
    },
    orderEntities: {
      'd183807c-4e18-49e4-b718-039265ecd107': {
        ProductID: 1,
        Barcode: 1,
        TransType: 20,
        _id: 'd183807c-4e18-49e4-b718-039265ecd107',
        Qty: 1
      }
    }
  },
  wastage: {
    wastageTypeToOrderMap: {
      'd183807c-4e18-49e4-b718-039265ecd107': '02',
      '8d68bdce-5e1c-4597-814f-7a3436f8718e': '02',
      '18b3d456-b564-45f3-8961-848541bb8cb9': '02',
      '637d8207-e462-4731-937f-de094128e570': '02',
      '2935141e-4245-4800-8782-03776bb0496f': '02'
    }
  },
  app: { storeID: '0' }
}

describe('Wastage Type Selectors', () => {
  testSelector({
    selector: wastageSelectors.wastageTypeToOrderMapSelector,
    state: mockParametersWastageTypeToOrderMapSelector,
    key: 'wastageTypeToOrderMap',
    xpath: 'wastage'
  })

  testSelector({
    selector: wastageSelectors.isProcessingSelector,
    state: mockParametersIsProcessingSelector,
    key: 'isProcessing',
    xpath: 'wastage.wastageProcessing'
  })
  testSelector({
    selector: wastageSelectors.isChangingWastageTypeSelector,
    state: mockParametersIsChangingWastageTypeSelector,
    key: 'isChangingWastageType',
    xpath: 'wastage.wastageEntities'
  })
  testSelector({
    selector: wastageSelectors.changingWastageTypeForSelector,
    state: mockParametersChangingWastageTypeForSelector,
    key: 'changingWastageTypeFor',
    xpath: 'wastage.wastageEntities'
  })
  // testSelector({
  //   selector: wastageSelectors.wastageTypesByIdSelector,
  //   state: mockParametersWastageTypesByIdSelector,
  //   key: 'byId',
  //   xpath: 'wastage.wastageTypes'
  // })
  // testSelector({
  //   selector: wastageSelectors.wastageTypesAllIdsSelector,
  //   state: mockParametersWastageTypesAllIdsSelector,
  //   key: 'allIds',
  //   xpath: 'wastage.wastageTypes'
  // })
  testReselectorWithLogic(
    wastageSelectors.wastageTypeEntitiesSelector(
      mockParametersWastageTypesByIdSelector
    ),
    [
      {
        Name: 'Damaged',
        TypeID: '01'
      }
    ],
    'wastageTypeEntitiesSelector'
  )
  testReselectorWithLogic(
    wastageSelectors.wastageTypeForOrderIdSelector(
      mockParametersWastageTypeForOrderIdSelector,
      '8a585dc5-85f4-457b-a4a9-1aed774996d5'
    ),
    {
      Name: 'Damaged',
      TypeID: '01'
    },
    'wastageTypeForOrderIdSelector'
  )
  testReselectorWithLogic(
    wastageSelectors.wastageEntitiesSelector(
      mockParametersWastageEntitiesSelector
    ),
    [
      {
        DimID: 0,
        ProductID: 1,
        Qty: 1,
        StoreID: '0',
        TypeID: '02',
        _id: 'd183807c-4e18-49e4-b718-039265ecd107'
      }
    ],
    'wastageEntitiesSelector'
  )
  // for undefined
  describe('wastageTypeForOrderIdSelector => for undefined', () => {
    testReselectorWithLogic(
      wastageSelectors.wastageTypeForOrderIdSelector(
        mockParametersWastageTypeForOrderIdSelector,
        '5'
      ),
      undefined
    )
  })
  describe('wastageTypeEntitiesSelector => for undefined', () => {
    testReselectorWithLogic(
      wastageSelectors.wastageTypeEntitiesSelector(
        mockParametersWastageTypesByIdSelectorForUndefined
      ),
      [undefined]
    )
  })
})
