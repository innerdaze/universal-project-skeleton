import { orderSelectors } from '../'
import genricSelector from '../../app/__test__/genericSelectorsTest'
const testReselectorWithLogic = genricSelector.expectValue
const testSelector = genricSelector.testSelector

const mockParametersIsChangingOrderQuantity = {
  order: {
    orders: {
      isChangingOrderQuantity: true
    }
  }
}
const mockParametersPendingModification = {
  order: {
    orders: {
      pendingModification: ['d183807c-4e18-49e4-b718-039265ecd107']
    }
  }
}
const mockParametersIsProcessing = {
  order: {
    orders: {
      isProcessing: true
    }
  }
}
const mockParametersPendingTransaction = {
  order: {
    orders: {
      pendingTransaction: ['d183807c-4e18-49e4-b718-039265ecd107']
    }
  }
}
const mockParametersIsDeletingOrder = {
  order: {
    orders: {
      isDeletingOrder: true
    }
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
const mockParametersMode = {
  order: {
    orders: {
      mode: 99
    }
  }
}
const mockParametersUnprocessedItems = {
  order: {
    orders: {
      unprocessedItems: ['d183807c-4e18-49e4-b718-039265ecd107']
    }
  }
}
const mockParameterPendingOrdersBySelectedModeSelector = {
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
        _id: 'd183807c-4e18-49e4-b718-039265ecd107'
      }
    }
  }
}
const mockParametersOrderEntities = {
  order: {
    orderEntities: {
      'd183807c-4e18-49e4-b718-039265ecd107': {
        ProductID: 1,
        Barcode: 1,
        TransType: 20
      }
    }
  }
}

describe('app Selectors', () => {
  testSelector({
    selector: orderSelectors.isChangingOrderQuantitySelector,
    state: mockParametersIsChangingOrderQuantity,
    key: 'isChangingOrderQuantity',
    xpath: 'order.orders'
  })

  testSelector({
    selector: orderSelectors.pendingModificationSelector,
    state: mockParametersPendingModification,
    key: 'pendingModification',
    xpath: 'order.orders'
  })
  testSelector({
    selector: orderSelectors.isProcessingSelector,
    state: mockParametersIsProcessing,
    key: 'isProcessing',
    xpath: 'order.orders'
  })
  testSelector({
    selector: orderSelectors.pendingTransactionSelector,
    state: mockParametersPendingTransaction,
    key: 'pendingTransaction',
    xpath: 'order.orders'
  })
  testSelector({
    selector: orderSelectors.isDeletingOrderSelector,
    state: mockParametersIsDeletingOrder,
    key: 'isDeletingOrder',
    xpath: 'order.orders'
  })
  testSelector({
    selector: orderSelectors.changingOrderQuantityForSelector,
    state: mockParametersChangingOrderQuantityFor,
    key: 'changingOrderQuantityFor',
    xpath: 'order.orders'
  })
  testSelector({
    selector: orderSelectors.modeSelector,
    state: mockParametersMode,
    key: 'mode',
    xpath: 'order.orders'
  })
  testSelector({
    selector: orderSelectors.unprocessedItemsSelector,
    state: mockParametersUnprocessedItems,
    key: 'unprocessedItems',
    xpath: 'order.orders'
  })

  testSelector({
    selector: orderSelectors.orderEntitiesSelector,
    state: mockParametersOrderEntities,
    key: 'orderEntities',
    xpath: 'order'
  })
  testReselectorWithLogic(
    orderSelectors.pendingOrdersBySelectedModeSelector(
      mockParameterPendingOrdersBySelectedModeSelector
    ),
    [
      {
        ProductID: 1,
        Barcode: 1,
        TransType: 20,
        _id: 'd183807c-4e18-49e4-b718-039265ecd107'
      }
    ],
    'pendingOrdersBySelectedModeSelector'
  )
})
