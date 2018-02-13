import { createSelector } from 'reselect'

 const isChangingOrderQuantity = state => state.order.isChangingOrderQuantity
 const pendingModification = state => state.order.pendingModification
 const isProcessing = state => state.order.isProcessing
 const pendingTransaction = state => state.order.pendingTransaction 
 const isDeletingOrder = state => state.order.isDeletingOrder
 const changingOrderQuantityFor = state => state.order.changingOrderQuantityFor 
 const mode = state => state.order.mode
 const unprocessedItems = state => state.order.unprocessedItems
 export default {
  isChangingOrderQuantity,
  pendingModification,
  isProcessing,
  pendingTransaction,
  isDeletingOrder,
  changingOrderQuantityFor,
  mode,
  unprocessedItems
  }