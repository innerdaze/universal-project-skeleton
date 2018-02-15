import { connect } from 'react-redux'
import _ from 'lodash'
import ScannedItemList from '../components/ScannedItemList'
import { orderOperations, orderSelectors } from '../ducks/order'
import { map } from 'lodash'

const mapStateToProps = state => {
  const orderEntities = orderSelectors.orderEntities(state)

  return {
    isProcessing: orderSelectors.isProcessing(state),
    isDeletingOrder: orderSelectors.isDeletingOrder(state),
    items: _(orderSelectors.unprocessedItems(state))
      .filter(
        id =>
          orderEntities[id] &&
          orderEntities[id].TransType === orderSelectors.mode(state)
      )
      .map(id => {
        // TODO: Move to selector
        const order = orderEntities[id]

        if (order) {
          let product

          if (order.ProductID) {
            product = state.product.productEntities[order.ProductID]
          }

          if (product) {
            order.productName = product.ProductName
            return order
          }

          order.productName = 'Error mapping barcode to product'
        }

        return order || null
      })
      .reverse()
      .value()
  }
}

const mapDispatchToProps = dispatch => ({
  onDeleteItemClick: id => dispatch(orderOperations.startDeletingOrder(id)),
  onDeleteItemConfirm: id => dispatch(orderOperations.deleteOrder(id)),
  onDeleteItemCancel: () => dispatch(orderOperations.cancelDeletingOrder()),
  onChangeOrderQuantityClick: order =>
    dispatch(orderOperations.startChangingOrderQuantity(order))
})

export default connect(mapStateToProps, mapDispatchToProps)(ScannedItemList)
