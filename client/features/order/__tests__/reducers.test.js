import orderAction from '../actions'
import orderReducers from '../reducers'
import {
  orders as ordersReducer,
  orderEntities as orderEntitiesReducer
} from '../reducers'
import OperationModes from '../../../constants/OperationModes'
import { difference } from 'lodash'
import { orderModel } from '../__fixtures__'

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
      let mockId = orderModel.id
      let mockOrder = orderModel.order

      const { unprocessedItems } = ordersReducer(
        initialState,
        orderAction.addOrder(mockId, mockOrder)
      )

      expect(unprocessedItems).toEqual([
        ...initialState.unprocessedItems,
        mockId
      ])
    })

    test('Expect handle DELETE_ORDER', () => {
      let mockId = orderModel.id

      const { unprocessedItems, isDeletingOrder } = ordersReducer(
        initialState,
        orderAction.deleteOrder(mockId)
      )

      expect(unprocessedItems).toEqual([])
      expect(isDeletingOrder).toEqual(false)
    })

    test('Expect handle CHANGE_ORDER_QUANTITY', () => {
      let mockId = orderModel.id
      let mockQuantity = orderModel.quantity

      const { isChangingOrderQuantity } = ordersReducer(
        initialState,
        orderAction.changeOrderQuantity(mockId, mockQuantity)
      )

      expect(isChangingOrderQuantity).toEqual(false)
    })

    test('Expect handle SUCCEED_PROCESS_ORDERS', () => {
      let mockOrderIDs = orderModel.orderIDs

      const { processedItems, unprocessedItems } = ordersReducer(
        initialState,
        orderAction.succeedProcessOrders(mockOrderIDs)
      )

      expect(processedItems).toEqual([
        ...initialState.unprocessedItems,
        ...initialState.processedItems
      ])
      expect(unprocessedItems).toEqual(
        difference(initialState.unprocessedItems, mockOrderIDs)
      )
    })

    test('Expect handle FAIL_PROCESS_ORDERS', () => {
      let mockErrorMsg = orderModel.error

      const { error, isProcessing } = ordersReducer(
        initialState,
        orderAction.failProcessOrders(mockErrorMsg)
      )

      expect(error).toEqual(mockErrorMsg)
      expect(isProcessing).toEqual(false)
    })

    test('Expect handle CHANGE_OPERATION_MODE', () => {
      let mockMode = orderModel.mode

      const { mode } = ordersReducer(
        initialState,
        orderAction.changeOperationMode(mockMode)
      )

      expect(mode).toEqual(mockMode)
    })

    test('Expect handle CREATE_PENDING_TRANSACTION', () => {
      let mockTransaction = orderModel.transaction

      const { pendingTransaction } = ordersReducer(
        initialState,
        orderAction.createPendingTransaction(mockTransaction)
      )

      expect(pendingTransaction).toEqual(mockTransaction)
    })

    test('Expect handle START_CHANGING_ORDER_QUANTITY', () => {
      let mockOrder = orderModel.order

      const {
        isChangingOrderQuantity,
        changingOrderQuantityFor
      } = ordersReducer(
        initialState,
        orderAction.startChangingOrderQuantity(mockOrder)
      )

      expect(isChangingOrderQuantity).toEqual(true)
      expect(changingOrderQuantityFor).toEqual(mockOrder)
    })

    test('Expect handle PROMPT_START_MODIFY_TRANSACTION', () => {
      let mockTransaction = orderModel.transaction

      const { pendingModification } = ordersReducer(
        initialState,
        orderAction.promptStartModifyTransaction(mockTransaction)
      )

      expect(pendingModification).toEqual(mockTransaction)
    })

    test('Expect handle CHANGE_PENDING_TRANSACTION_QUANTITY', () => {
      let mockQuantity = orderModel.quantity

      const { pendingTransaction } = ordersReducer(
        initialState,
        orderAction.changePendingTransactionQuantity(mockQuantity)
      )

      expect(pendingTransaction).toHaveProperty('Qty', mockQuantity)
    })

    test('Expect handle CANCEL_DELETING_ORDER', () => {
      const { isDeletingOrder } = ordersReducer(
        initialState,
        orderAction.cancelDeletingOrder()
      )

      expect(isDeletingOrder).toEqual(false)
    })

    test('Expect handle START_DELETING_ORDER', () => {
      const { isDeletingOrder } = ordersReducer(
        initialState,
        orderAction.startDeletingOrder()
      )

      expect(isDeletingOrder).toEqual(true)
    })

    test('Expect handle FINISH_CHANGING_ORDER_QUANTITY', () => {
      const {
        isChangingOrderQuantity,
        changingOrderQuantityFor
      } = ordersReducer(initialState, orderAction.finishChangingOrderQuantity())

      expect(isChangingOrderQuantity).toEqual(false)
      expect(changingOrderQuantityFor).toBeNull()
    })

    test('Expect handle CANCEL_CHANGING_ORDER_QUANTITY', () => {
      const {
        isChangingOrderQuantity,
        changingOrderQuantityFor
      } = ordersReducer(initialState, orderAction.cancelChangingOrderQuantity())

      expect(isChangingOrderQuantity).toEqual(false)
      expect(changingOrderQuantityFor).toBeNull()
    })

    test('Expect handle REQUEST_PROCESS_ORDERS', () => {
      const { isProcessing } = ordersReducer(
        initialState,
        orderAction.requestProcessOrders()
      )

      expect(isProcessing).toEqual(true)
    })

    test('Expect handle RECEIVE_PROCESS_ORDERS', () => {
      const { isProcessing, lastUpdated } = ordersReducer(
        initialState,
        orderAction.receiveProcessOrders()
      )

      expect(isProcessing).toEqual(false)
      expect(lastUpdated).toEqual(expect.any(Number))
    })

    test('Expect handle DISCARD_PENDING_TRANSACTION', () => {
      const { pendingTransaction } = ordersReducer(
        initialState,
        orderAction.discardPendingTransaction()
      )

      expect(pendingTransaction).toBeNull()
    })

    test('Expect handle CONFIRM_START_MODIFY_TRANSACTION', () => {
      const { pendingModification } = ordersReducer(
        initialState,
        orderAction.confirmStartModifyTransaction()
      )

      expect(pendingModification).toBeNull()
    })

    test('Expect handle CANCEL_START_MODIFY_TRANSACTION', () => {
      const { pendingModification } = ordersReducer(
        initialState,
        orderAction.cancelStartModifyTransaction()
      )

      expect(pendingModification).toBeNull()
    })
  })

  describe('Test on orderEntities reducer', () => {
    test('Expect handle ADD_ORDER', () => {
      let mockId = orderModel.id
      let mockOrder = orderModel.order

      const returnState = orderEntitiesReducer(
        initialState,
        orderAction.addOrder(mockId, mockOrder)
      )

      expect(returnState).toHaveProperty(mockId, mockOrder)
    })

    test('Expect handle DELETE_ORDER', () => {
      let mockId = orderModel.id

      initialState[mockId] = []

      const returnState = orderEntitiesReducer(
        initialState,
        orderAction.deleteOrder(mockId)
      )

      expect(returnState).not.toHaveProperty(mockId)
    })

    test('Expect handle CHANGE_ORDER_QUANTITY', () => {
      let mockId = orderModel.id
      let mockQuantity = orderModel.quantity

      const returnState = orderEntitiesReducer(
        initialState,
        orderAction.changeOrderQuantity(mockId, mockQuantity)
      )

      expect(returnState).toHaveProperty(mockId)
      expect(returnState[mockId]).toHaveProperty('Qty', mockQuantity)
    })
  })
})
