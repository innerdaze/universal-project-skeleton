import { createSelector } from 'reselect'
import { compose, propEq, reverse, filter, flip, prop, map } from 'ramda'

const isChangingOrderQuantitySelector = state =>
  state.order.orders.isChangingOrderQuantity
const pendingModificationSelector = state =>
  state.order.orders.pendingModification
const isProcessingSelector = state => state.order.orders.isProcessing
const pendingTransactionSelector = state =>
  state.order.orders.pendingTransaction
const isDeletingOrderSelector = state => state.order.orders.isDeletingOrder
const changingOrderQuantityForSelector = state =>
  state.order.orders.changingOrderQuantityFor
const modeSelector = state => state.order.orders.mode
const unprocessedItemsSelector = state => state.order.orders.unprocessedItems
const orderEntitiesSelector = state => state.order.orderEntities

const filterByTransType = compose(filter, propEq('TransType'))
const flippedProp = flip(prop)

const pendingOrdersBySelectedModeSelector = createSelector(
  [unprocessedItemsSelector, orderEntitiesSelector, modeSelector],
  (unprocessedItems, orderEntities, mode) =>
    filterByTransType(mode)(map(flippedProp(orderEntities), unprocessedItems))
)

export default {
  isChangingOrderQuantitySelector,
  pendingModificationSelector,
  isProcessingSelector,
  pendingTransactionSelector,
  isDeletingOrderSelector,
  changingOrderQuantityForSelector,
  modeSelector,
  unprocessedItemsSelector,
  orderEntitiesSelector,
  pendingOrdersBySelectedModeSelector
}
