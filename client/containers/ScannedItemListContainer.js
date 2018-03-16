import { connect } from 'react-redux'
import ScannedItemList from '../components/ScannedItemList'
import { orderOperations, orderSelectors } from '~features/order'
import { wastageSelectors } from '~features/wastage'
import { inventorySelectors } from '~features/inventory'

const mapStateToProps = state => ({
  isProcessing:
    wastageSelectors.isProcessingSelector(state) ||
    orderSelectors.isProcessingSelector(state),
  isDeletingOrder: orderSelectors.isDeletingOrderSelector(state),
  items: inventorySelectors.pendingOrdersBySelectedModeWithProductsReversedSelector(
    state
  )
})

const mapDispatchToProps = dispatch => ({
  onDeleteItemClick: id => dispatch(orderOperations.startDeletingOrder(id)),
  onDeleteItemConfirm: id => dispatch(orderOperations.deleteOrder(id)),
  onDeleteItemCancel: () => dispatch(orderOperations.cancelDeletingOrder()),
  onChangeOrderQuantityClick: order =>
    dispatch(orderOperations.startChangingOrderQuantity(order))
})

export default connect(mapStateToProps, mapDispatchToProps)(ScannedItemList)
