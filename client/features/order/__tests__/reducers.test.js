import orderReducers from '../reducers'
import OperationModes from '../../../constants/OperationModes'
import { difference } from 'lodash'

const initialState = {
  isProcessing: false,
  lastUpdated: null,
  unprocessedItems: [],
  processedItems: [],
  error: null,
  mode: OperationModes.ORDERING,
  pendingTransaction: null,
  pendingModification: null,
  isDeletingOrder: false,
  isChangingOrderQuantity: false,
  changingOrderQuantityFor: null
}

describe('Testing on orderReducers...', () => {
  describe('Test on orders reducer', () => {
    test('Expect handle ADD_ORDER', () => {
      let id = 'foo'
      let order = []
      let action = {
        type: 'ORDER/ADD_ORDER',
        payload: {
          id,
          order
        }
      }

      let expectedState = {
        ...initialState,
        unprocessedItems: [...initialState.unprocessedItems, id]
      }

      expect(orderReducers({}, action).orders).toEqual(expectedState)
    })

    test('Expect handle DELETE_ORDER', () => {
      let id = 'foo'
      let action = {
        type: 'ORDER/DELETE_ORDER',
        payload: {
          id
        }
      }

      let state = {
        ...initialState,
        unprocessedItems: []
      }

      let expectedState = {
        ...state,
        isDeletingOrder: false,
        unprocessedItems: state.unprocessedItems.filter(value => value !== id)
      }

      expect(orderReducers({}, action).orders).toEqual(expectedState)
    })

    test('Expect handle CHANGE_ORDER_QUANTITY', () => {
      let id = 'foo'
      let quantity = 1
      let action = {
        type: 'ORDER/CHANGE_ORDER_QUANTITY',
        payload: {
          id,
          quantity
        }
      }

      let expectedState = {
        ...initialState,
        isChangingOrderQuantity: false
      }

      expect(orderReducers({}, action).orders).toEqual(expectedState)
    })

    test('Expect handle SUCCEED_PROCESS_ORDERS', () => {
      let orderIDs = 'foo'
      let action = {
        type: 'ORDER/SUCCEED_PROCESS_ORDERS',
        payload: {
          orderIDs
        }
      }

      let expectedState = {
        ...initialState,
        processedItems: [
          ...initialState.unprocessedItems,
          ...initialState.processedItems
        ],
        unprocessedItems: difference(initialState.unprocessedItems, orderIDs)
      }

      expect(orderReducers({}, action).orders).toEqual(expectedState)
    })

    test('Expect handle FAIL_PROCESS_ORDERS', () => {
      let error = 'Error message'
      let action = {
        type: 'ORDER/FAIL_PROCESS_ORDERS',
        payload: {
          error
        }
      }

      let expectedState = {
        ...initialState,
        error: error,
        isProcessing: false
      }

      expect(orderReducers({}, action).orders).toEqual(expectedState)
    })

    test('Expect handle CHANGE_OPERATION_MODE', () => {
      let mode = 'test'
      let action = {
        type: 'ORDER/CHANGE_OPERATION_MODE',
        payload: {
          mode
        }
      }

      let expectedState = {
        ...initialState,
        mode: mode
      }

      expect(orderReducers({}, action).orders).toEqual(expectedState)
    })

    test('Expect handle CREATE_PENDING_TRANSACTION', () => {
      let transaction = 'foo'
      let action = {
        type: 'ORDER/CREATE_PENDING_TRANSACTION',
        payload: {
          transaction
        }
      }

      let expectedState = {
        ...initialState,
        pendingTransaction: transaction
      }

      expect(orderReducers({}, action).orders).toEqual(expectedState)
    })

    test('Expect handle START_CHANGING_ORDER_QUANTITY', () => {
      let order = 'foo'
      let action = {
        type: 'ORDER/START_CHANGING_ORDER_QUANTITY',
        payload: {
          order
        }
      }

      let expectedState = {
        ...initialState,
        isChangingOrderQuantity: true,
        changingOrderQuantityFor: order
      }

      expect(orderReducers({}, action).orders).toEqual(expectedState)
    })

    test('Expect handle PROMPT_START_MODIFY_TRANSACTION', () => {
      let transaction = 'foo'
      let action = {
        type: 'ORDER/PROMPT_START_MODIFY_TRANSACTION',
        payload: {
          transaction
        }
      }

      let expectedState = {
        ...initialState,
        pendingModification: transaction
      }

      expect(orderReducers({}, action).orders).toEqual(expectedState)
    })

    test('Expect handle CHANGE_PENDING_TRANSACTION_QUANTITY', () => {
      let quantity = 10
      let action = {
        type: 'ORDER/CHANGE_PENDING_TRANSACTION_QUANTITY',
        payload: {
          quantity
        }
      }

      let expectedState = {
        ...initialState,
        pendingTransaction: {
          ...initialState.pendingTransaction,
          Qty: quantity
        }
      }

      expect(orderReducers({}, action).orders).toEqual(expectedState)
    })

    test('Expect handle CANCEL_DELETING_ORDER', () => {
      let action = {
        type: 'ORDER/CANCEL_DELETING_ORDER'
      }

      let expectedState = {
        ...initialState,
        isDeletingOrder: false
      }

      expect(orderReducers({}, action).orders).toEqual(expectedState)
    })

    test('Expect handle START_DELETING_ORDER', () => {
      let action = {
        type: 'ORDER/START_DELETING_ORDER'
      }

      let expectedState = {
        ...initialState,
        isDeletingOrder: true
      }

      expect(orderReducers({}, action).orders).toEqual(expectedState)
    })

    test('Expect handle FINISH_CHANGING_ORDER_QUANTITY', () => {
      let action = {
        type: 'ORDER/FINISH_CHANGING_ORDER_QUANTITY'
      }

      let expectedState = {
        ...initialState,
        isChangingOrderQuantity: false,
        changingOrderQuantityFor: null
      }

      expect(orderReducers({}, action).orders).toEqual(expectedState)
    })

    test('Expect handle CANCEL_CHANGING_ORDER_QUANTITY', () => {
      let action = {
        type: 'ORDER/CANCEL_CHANGING_ORDER_QUANTITY'
      }

      let expectedState = {
        ...initialState,
        isChangingOrderQuantity: false,
        changingOrderQuantityFor: null
      }

      expect(orderReducers({}, action).orders).toEqual(expectedState)
    })

    test('Expect handle REQUEST_PROCESS_ORDERS', () => {
      let action = {
        type: 'ORDER/REQUEST_PROCESS_ORDERS'
      }

      let expectedState = {
        ...initialState,
        isProcessing: true
      }

      expect(orderReducers({}, action).orders).toEqual(expectedState)
    })

    test('Expect handle RECEIVE_PROCESS_ORDERS', () => {
      let action = {
        type: 'ORDER/RECEIVE_PROCESS_ORDERS'
      }

      let expectedState = {
        ...initialState,
        isProcessing: false,
        lastUpdated: expect.any(Number)
      }

      expect(orderReducers({}, action).orders).toEqual(expectedState)
    })

    test('Expect handle DISCARD_PENDING_TRANSACTION', () => {
      let action = {
        type: 'ORDER/DISCARD_PENDING_TRANSACTION'
      }

      let expectedState = {
        ...initialState,
        pendingTransaction: null
      }

      expect(orderReducers({}, action).orders).toEqual(expectedState)
    })

    test('Expect handle CONFIRM_START_MODIFY_TRANSACTION', () => {
      let action = {
        type: 'ORDER/CONFIRM_START_MODIFY_TRANSACTION'
      }

      let expectedState = {
        ...initialState,
        pendingModification: null
      }

      expect(orderReducers({}, action).orders).toEqual(expectedState)
    })

    test('Expect handle CANCEL_START_MODIFY_TRANSACTION', () => {
      let action = {
        type: 'ORDER/CANCEL_START_MODIFY_TRANSACTION'
      }

      let expectedState = {
        ...initialState,
        pendingModification: null
      }

      expect(orderReducers({}, action).orders).toEqual(expectedState)
    })
  })

  describe('Test on orderEntities reducer', () => {
    test('Expect handle ADD_ORDER', () => {
      let id = 'foo'
      let order = []
      let action = {
        type: 'ORDER/ADD_ORDER',
        payload: {
          id,
          order
        }
      }

      let expectedValue = {
        [id]: order
      }

      expect(orderReducers({}, action).orderEntities).toEqual(expectedValue)
    })

    test('Expect handle DELETE_ORDER', () => {
      let id = 'foo'
      let action = {
        type: 'ORDER/DELETE_ORDER',
        payload: {
          id
        }
      }

      let expectedValue = {}

      expect(orderReducers({}, action).orderEntities).toEqual(expectedValue)
    })

    test('Expect handle CHANGE_ORDER_QUANTITY', () => {
      let id = 'foo'
      let quantity = 20
      let action = {
        type: 'ORDER/CHANGE_ORDER_QUANTITY',
        payload: {
          id,
          quantity
        }
      }

      let expectedValue = {
        [id]: {
          Qty: quantity
        }
      }

      expect(orderReducers({}, action).orderEntities).toEqual(expectedValue)
    })
  })
})
