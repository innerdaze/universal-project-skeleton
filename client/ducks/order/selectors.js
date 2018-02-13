import { createSelector } from 'reselect'

 const isChangingOrderQuantity = state => state.order.orders.isChangingOrderQuantity
 const pendingModification = state => state.order.orders.pendingModification
 const isProcessing = state => state.order.orders.isProcessing
 const pendingTransaction = state => state.order.orders.pendingTransaction 
 const isDeletingOrder = state => state.order.orders.isDeletingOrder
 const changingOrderQuantityFor = state => state.order.orders.changingOrderQuantityFor 
 const mode = state => state.order.orders.mode
 const unprocessedItems = state => state.order.orders.unprocessedItems
 const orderEntities=state=>state.order.orderEntities
 export default {
  isChangingOrderQuantity,
  pendingModification,
  isProcessing,
  pendingTransaction,
  isDeletingOrder,
  changingOrderQuantityFor,
  mode,
  unprocessedItems,
  orderEntities
  }