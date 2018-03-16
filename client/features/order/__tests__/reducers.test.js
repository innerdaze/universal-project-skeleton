import orderActions from '../actions'
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
        orderActions.order.addOrder(mockId, mockOrder)
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
        orderActions.order.deleteOrder(mockId)
      )

      expect(unprocessedItems).toEqual([])
      expect(isDeletingOrder).toEqual(false)
    })

    test('Expect handle CHANGE_ORDER_QUANTITY', () => {
      let mockId = orderModel.id
      let mockQuantity = orderModel.quantity

      const { isChangingOrderQuantity } = ordersReducer(
        initialState,
        orderActions.order.changeOrderQuantity(mockId, mockQuantity)
      )

      expect(isChangingOrderQuantity).toEqual(false)
    })

    test('Expect handle SUCCEED_PROCESS_ORDERS', () => {
      let mockOrderIDs = orderModel.orderIDs

      const { processedItems, unprocessedItems } = ordersReducer(
        initialState,
        orderActions.order.succeedProcessOrders(mockOrderIDs)
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
        orderActions.order.failProcessOrders(mockErrorMsg)
      )

      expect(error).toEqual(mockErrorMsg)
      expect(isProcessing).toEqual(false)
    })

    test('Expect handle CHANGE_OPERATION_MODE', () => {
      let mockMode = orderModel.mode

      const { mode } = ordersReducer(
        initialState,
        orderActions.order.changeOperationMode(mockMode)
      )

      expect(mode).toEqual(mockMode)
    })

    test('Expect handle CREATE_PENDING_TRANSACTION', () => {
      let mockTransaction = orderModel.transaction

      const { pendingTransaction } = ordersReducer(
        initialState,
        orderActions.order.createPendingTransaction(mockTransaction)
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
        orderActions.order.startChangingOrderQuantity(mockOrder)
      )

      expect(isChangingOrderQuantity).toEqual(true)
      expect(changingOrderQuantityFor).toEqual(mockOrder)
    })

    test('Expect handle PROMPT_START_MODIFY_TRANSACTION', () => {
      let mockTransaction = orderModel.transaction

      const { pendingModification } = ordersReducer(
        initialState,
        orderActions.order.promptStartModifyTransaction(mockTransaction)
      )

      expect(pendingModification).toEqual(mockTransaction)
    })

    test('Expect handle CHANGE_PENDING_TRANSACTION_QUANTITY', () => {
      let mockQuantity = orderModel.quantity

      const { pendingTransaction } = ordersReducer(
        initialState,
        orderActions.order.changePendingTransactionQuantity(mockQuantity)
      )

      expect(pendingTransaction).toHaveProperty('Qty', mockQuantity)
    })

    test('Expect handle CANCEL_DELETING_ORDER', () => {
      const { isDeletingOrder } = ordersReducer(
        initialState,
        orderActions.order.cancelDeletingOrder()
      )

      expect(isDeletingOrder).toEqual(false)
    })

    test('Expect handle START_DELETING_ORDER', () => {
      const { isDeletingOrder } = ordersReducer(
        initialState,
        orderActions.order.startDeletingOrder()
      )

      expect(isDeletingOrder).toEqual(true)
    })

    test('Expect handle FINISH_CHANGING_ORDER_QUANTITY', () => {
      const {
        isChangingOrderQuantity,
        changingOrderQuantityFor
      } = ordersReducer(
        initialState,
        orderActions.order.finishChangingOrderQuantity()
      )

      expect(isChangingOrderQuantity).toEqual(false)
      expect(changingOrderQuantityFor).toBeNull()
    })

    test('Expect handle CANCEL_CHANGING_ORDER_QUANTITY', () => {
      const {
        isChangingOrderQuantity,
        changingOrderQuantityFor
      } = ordersReducer(
        initialState,
        orderActions.order.cancelChangingOrderQuantity()
      )

      expect(isChangingOrderQuantity).toEqual(false)
      expect(changingOrderQuantityFor).toBeNull()
    })

    test('Expect handle REQUEST_PROCESS_ORDERS', () => {
      const { isProcessing } = ordersReducer(
        initialState,
        orderActions.order.requestProcessOrders()
      )

      expect(isProcessing).toEqual(true)
    })

    test('Expect handle RECEIVE_PROCESS_ORDERS', () => {
      const { isProcessing, lastUpdated } = ordersReducer(
        initialState,
        orderActions.order.receiveProcessOrders()
      )

      expect(isProcessing).toEqual(false)
      expect(lastUpdated).toEqual(expect.any(Number))
    })

    test('Expect handle DISCARD_PENDING_TRANSACTION', () => {
      const { pendingTransaction } = ordersReducer(
        initialState,
        orderActions.order.discardPendingTransaction()
      )

      expect(pendingTransaction).toBeNull()
    })

    test('Expect handle CONFIRM_START_MODIFY_TRANSACTION', () => {
      const { pendingModification } = ordersReducer(
        initialState,
        orderActions.order.confirmStartModifyTransaction()
      )

      expect(pendingModification).toBeNull()
    })

    test('Expect handle CANCEL_START_MODIFY_TRANSACTION', () => {
      const { pendingModification } = ordersReducer(
        initialState,
        orderActions.order.cancelStartModifyTransaction()
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
        orderActions.order.addOrder(mockId, mockOrder)
      )

      expect(returnState).toHaveProperty(mockId, mockOrder)
    })

    test('Expect handle DELETE_ORDER', () => {
      let mockId = orderModel.id

      initialState[mockId] = []

      const returnState = orderEntitiesReducer(
        initialState,
        orderActions.order.deleteOrder(mockId)
      )

      expect(returnState).not.toHaveProperty(mockId)
    })

    test('Expect handle CHANGE_ORDER_QUANTITY', () => {
      let mockId = orderModel.id
      let mockQuantity = orderModel.quantity

      const returnState = orderEntitiesReducer(
        initialState,
        orderActions.order.changeOrderQuantity(mockId, mockQuantity)
      )

      expect(returnState).toHaveProperty(mockId)
      expect(returnState[mockId]).toHaveProperty('Qty', mockQuantity)
    })
  })
})
