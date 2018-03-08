import orderActions from '../../features/order/actions'

describe('Testing on order actions', () => {
  test('Test addOrder', () => {
    let id = 'foo'
    let order = []
    let expectedAction = {
      type: 'ORDER/ADD_ORDER',
      payload: {
        id,
        order
      }
    }
    expect(orderActions.order.addOrder(id, order)).toEqual(expectedAction)
  })

  test('Test deleteOrder', () => {
    let id = 'foo'
    let expectedAction = {
      type: 'ORDER/DELETE_ORDER',
      payload: {
        id
      }
    }
    expect(orderActions.order.deleteOrder(id)).toEqual(expectedAction)
  })

  test('Test changeOrderQuantity', () => {
    let id = 'foo'
    let quantity = 1
    let expectedAction = {
      type: 'ORDER/CHANGE_ORDER_QUANTITY',
      payload: {
        id,
        quantity
      }
    }
    expect(orderActions.order.changeOrderQuantity(id, quantity)).toEqual(
      expectedAction
    )
  })

  test('Test succeedProcessOrders', () => {
    let orderIDs = 'foo'
    let expectedAction = {
      type: 'ORDER/SUCCEED_PROCESS_ORDERS',
      payload: {
        orderIDs
      }
    }
    expect(orderActions.order.succeedProcessOrders(orderIDs)).toEqual(
      expectedAction
    )
  })

  test('Test failProcessOrders', () => {
    let error = 'foo'
    let expectedAction = {
      type: 'ORDER/FAIL_PROCESS_ORDERS',
      payload: {
        error
      }
    }
    expect(orderActions.order.failProcessOrders(error)).toEqual(expectedAction)
  })

  test('Test changeOperationMode', () => {
    let mode = 'foo'
    let expectedAction = {
      type: 'ORDER/CHANGE_OPERATION_MODE',
      payload: {
        mode
      }
    }
    expect(orderActions.order.changeOperationMode(mode)).toEqual(expectedAction)
  })

  test('Test createPendingTransaction', () => {
    let transaction = 'foo'
    let expectedAction = {
      type: 'ORDER/CREATE_PENDING_TRANSACTION',
      payload: {
        transaction
      }
    }
    expect(orderActions.order.createPendingTransaction(transaction)).toEqual(
      expectedAction
    )
  })

  test('Test startChangingOrderQuantity', () => {
    let order = 'foo'
    let expectedAction = {
      type: 'ORDER/START_CHANGING_ORDER_QUANTITY',
      payload: {
        order
      }
    }
    expect(orderActions.order.startChangingOrderQuantity(order)).toEqual(
      expectedAction
    )
  })

  test('Test promptStartModifyTransaction', () => {
    let transaction = 'foo'
    let expectedAction = {
      type: 'ORDER/PROMPT_START_MODIFY_TRANSACTION',
      payload: {
        transaction
      }
    }
    expect(
      orderActions.order.promptStartModifyTransaction(transaction)
    ).toEqual(expectedAction)
  })

  test('Test changePendingTransactionQuantity', () => {
    let quantity = 1
    let expectedAction = {
      type: 'ORDER/CHANGE_PENDING_TRANSACTION_QUANTITY',
      payload: {
        quantity
      }
    }
    expect(
      orderActions.order.changePendingTransactionQuantity(quantity)
    ).toEqual(expectedAction)
  })
})
