import actions from './actions'
import { barcodeOperations } from '../barcode'
import { networkOperations } from '../network'
import { v4 as uuidGen } from 'uuid'
import { find, filter, includes, map } from 'lodash'
const orderAction = actions.order
const addOrder = (id, order) => {
  return dispatch(orderAction.addOrder(id, order))
}

const deleteOrder = id => {
  return dispatch(orderAction.deleteOrder(id))
}

const cancelDeletingOrder = () => {
  return dispatch(orderAction.cancelDeletingOrder())
}

const startDeletingOrder = () => {
  return dispatch(orderAction.startDeletingOrder())
}

const startChangingOrderQuantity = order => {
  return dispatch(orderAction.startDeletingOrder(order))
}

const finishChangingOrderQuantity = () => {
  return (dispatch, getState) => {
    dispatch(orderAction.finishChangingOrderQuantity())

    if (getState().orders.pendingTransaction) {
      completePendingTransaction()
    }
  }
}

const cancelChangingOrderQuantity = () => {
  return (dispatch, getState) => {
    dispatch(orderAction.cancelChangingOrderQuantity())
    if (getState().orders.pendingTransaction) {
      discardPendingTransaction()
    }
  }
}

const changeOrderQuantity = (id, quantity) => {
  return (dispatch, getState) => {
    if (getState().orders.pendingTransaction) {
      dispatch(orderAction.changePendingTransactionQuantity(quantity))
    } else {
      dispatch(orderAction.changeOrderQuantity(id, quantity))
    }
  }
}

const requestProcessOrders = () => {
  return dispatch(orderAction.requestProcessOrders())
}

const receiveProcessOrders = () => {
  return dispatch(orderAction.receiveProcessOrders())
}

const succeedProcessOrders = orderIDs => {
  return dispatch(orderAction.succeedProcessOrders(orderIDs))
}

const failProcessOrders = error => {
  return dispatch(orderAction.failProcessOrders(error))
}

const processOrders = () => {
  return function(dispatch, getState) {
    requestProcessOrders()

    const { orders, orderEntities } = getState()

    const orderIDs = filter(orders.unprocessedItems, id => {
      return (
        orderEntities.hasOwnProperty(id) &&
        orderEntities[id].TransType === orders.mode
      )
    })

    const filteredOrders = map(orderIDs, id => {
      return orderEntities.hasOwnProperty(id) && orderEntities[id]
    })

    return dispatch(
      networkOperations.callApi({
        service: 'HandheldService.ProcessTransactions',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        params: {
          Data: filteredOrders
        },
        success: () => {
          receiveProcessOrders()
          succeedProcessOrders(orderIDs)
        },
        error: error => failProcessOrders(error)
      })
    )
  }
}

const changeOperationMode = mode => {
  return dispatch(orderAction.changeOperationMode(mode))
}

const createPendingTransaction = transaction => {
  return dispatch(orderAction.createPendingTransaction(transaction))
}

const discardPendingTransaction = () => {
  return dispatch(orderAction.discardPendingTransaction())
}

const completePendingTransaction = () => {
  return getState => {
    const transaction = getState().orders.pendingTransaction

    addOrder(transaction._id, transaction)
    discardPendingTransaction()
  }
}

const createPendingTransactionByProduct = product => {
  return getState => {
    const transaction = findTransactionByProduct(
      getState,
      product,
      getState().orders.mode
    )

    if (transaction) {
      dispatch(promptStartModifyTransaction(transaction))
    } else {
      const barcodeID = getState().barcodeIDsByProductID[product.ProductID]
      const transaction = _createTransaction({
        getState,
        product,
        barcode: getState().barcodeEntities[barcodeID],
        mode: getState().orders.mode
      })
      createPendingTransaction(transaction)
      startChangingOrderQuantity(transaction)
    }
  }
}

const createPendingTransactionByBarcodeID = barcodeID => {
  return (dispatch, getState) => {
    const barcode = dispatch(barcodeOperations._findBarcodeByID(barcodeID))

    if (barcode) {
      const transaction = findTransactionByBarcode(
        getState,
        barcode,
        getState().orders.mode
      )

      if (transaction) {
        promptStartModifyTransaction(transaction)
      } else {
        const transaction = _createTransaction({
          getState,
          barcode,
          mode: getState().orders.mode
        })
        createPendingTransaction(transaction)
        startChangingOrderQuantity(transaction)
      }
    }
  }
}

const _createTransaction = ({
  getState,
  barcode,
  product,
  quantity = 1,
  mode
}) => {
  const productID = barcode ? barcode.ProductID : product.ProductID

  if (!product) {
    product = productID && getState().productEntities[productID]
  }

  return {
    _id: uuidGen(),
    __type: 'HandheldTrans',
    AreaID: getState().app.storeID,
    Barcode: barcode && barcode.Barcode,
    Qty: quantity,
    Ref1: '',
    Ref2: '',
    TermianlID:
      window.cordova && window.device
        ? window.device.uuid
        : getState().terminalID,
    TransDate: new Date().toISOString().slice(0, -1),
    TransType: mode,
    ProductID: productID,
    ProductName: product && product.ProductName,
    UserID: getState().cashiers.activeCashier.CashierID
  }
}

const findTransactionByBarcode = (getState, barcode, mode) => {
  return find(
    filter(getState().orderEntities, (item, key) => {
      return includes(getState().orders.unprocessedItems, key)
    }),
    {
      TransType: mode,
      Barcode: barcode.Barcode
    }
  )
}

const findTransactionByProduct = (getState, product, mode) => {
  return find(
    filter(getState().orderEntities, (item, key) => {
      return includes(getState().orders.unprocessedItems, key)
    }),
    {
      TransType: mode,
      ProductID: product.ProductID
    }
  )
}

const promptStartModifyTransaction = transaction => {
  return dispatch(orderAction.promptStartModifyTransaction(transaction))
}

const confirmStartModifyTransaction = () => {
  return dispatch(orderAction.confirmStartModifyTransaction())
}

const cancelStartModifyTransaction = () => {
  return dispatch(orderAction.cancelStartModifyTransaction())
}

export default {
  cancelStartModifyTransaction,
  confirmStartModifyTransaction,
  promptStartModifyTransaction,
  createPendingTransactionByBarcodeID,
  createPendingTransactionByProduct,
  finishChangingOrderQuantity,
  startChangingOrderQuantity,
  startDeletingOrder,
  cancelDeletingOrder,
  deleteOrder,
  addOrder,
  changeOperationMode,
  findTransactionByProduct,
  discardPendingTransaction,
  processOrders
}
