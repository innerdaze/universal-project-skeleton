import actions from './actions'
import { barcodeOperations } from '../barcode'
import { networkOperations } from '../network'
import { v4 as uuidGen } from 'uuid'
import { find, filter, includes, map } from 'lodash'
import { orderSelectors } from '../order'
const orderAction = actions.order

const {
  createPendingTransaction,
  startChangingOrderQuantity,
  promptStartModifyTransaction,
  discardPendingTransaction,
  addOrder,
  requestProcessOrders,
  receiveProcessOrders,
  succeedProcessOrders
} = orderAction

const finishChangingOrderQuantity = () => {
  return (dispatch, getState) => {
    debugger
    dispatch(orderAction.finishChangingOrderQuantity())

    if (orderSelectors.pendingTransaction(getState())) {
      dispatch(completePendingTransaction())
    }
  }
}

const cancelChangingOrderQuantity = () => {
  return (dispatch, getState) => {
    dispatch(orderAction.cancelChangingOrderQuantity())
    if (orderSelectors.pendingTransaction(getState())) {
      dispatch(discardPendingTransaction())
    }
  }
}

const changeOrderQuantity = (id, quantity) => {
  return (dispatch, getState) => {
    if (orderSelectors.pendingTransaction(getState())) {
      dispatch(orderAction.changePendingTransactionQuantity(quantity))
    } else {
      dispatch(orderAction.changeOrderQuantity(id, quantity))
    }
  }
}

const processOrders = () => {
  return function(dispatch, getState) {
    dispatch(requestProcessOrders())

    const state = getState()
    const orderEntities = orderSelectors.orderEntities(state)

    const orderIDs = filter(orderSelectors.unprocessedItems(state), id => {
      return (
        orderEntities.hasOwnProperty(id) &&
        orderEntities[id].TransType === orderSelectors.mode(state)
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
          dispatch(receiveProcessOrders())
          dispatch(succeedProcessOrders(orderIDs))
        },
        error: error => dispatch(failProcessOrders(error))
      })
    )
  }
}

const completePendingTransaction = () => {
  return (dispatch, getState) => {
    const transaction = orderSelectors.pendingTransaction(getState())

    dispatch(addOrder(transaction._id, transaction))
    dispatch(discardPendingTransaction())
  }
}

const createPendingTransactionByProduct = product => {
  return (dispatch, getState) => {
    const state = getState()
    const orderMode = orderSelectors.mode(state)
    const transaction = findTransactionByProduct(state, product, orderMode)

    if (transaction) {
      dispatch(promptStartModifyTransaction(transaction))
    } else {
      const barcodeID = getState().barcode.barcodeIDsByProductID[
        product.ProductID
      ]
      const transaction = _createTransaction({
        getState,
        product,
        barcode: getState().barcode.barcodeEntities[barcodeID],
        mode: orderMode
      })
      dispatch(createPendingTransaction(transaction))
      dispatch(startChangingOrderQuantity(transaction))
    }
  }
}

const createPendingTransactionByBarcodeID = barcodeID => {
  return (dispatch, getState) => {
    const barcode = dispatch(barcodeOperations._findBarcodeByID(barcodeID))
    const state = getState()
    const orderMode = orderSelectors.mode(getState())
    if (barcode) {
      const transaction = findTransactionByBarcode(state, barcode, orderMode)

      if (transaction) {
        dispatch(promptStartModifyTransaction(transaction))
      } else {
        const transaction = _createTransaction({
          getState,
          barcode,
          mode: orderMode
        })
        dispatch(createPendingTransaction(transaction))
        dispatch(startChangingOrderQuantity(transaction))
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
    product = productID && getState().product.productEntities[productID]
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
    UserID: getState().cashier.cashiers.activeCashier.CashierID
  }
}

const findTransaction = (state, options) =>
  find(
    filter(orderSelectors.orderEntities(state), (item, key) => {
      return includes(orderSelectors.unprocessedItems(state), key)
    }),
    options
  )

const findTransactionByBarcode = (state, barcode, mode) => {
  return findTransaction(state, {
    TransType: mode,
    Barcode: barcode.Barcode
  })
}

const findTransactionByProduct = (state, product, mode) => {
  return findTransaction(state, {
    TransType: mode,
    ProductID: product.ProductID
  })
}

export default {
  ...actions.order,
  createPendingTransactionByBarcodeID,
  createPendingTransactionByProduct,
  finishChangingOrderQuantity,
  findTransactionByProduct,
  processOrders
}
