import { connect } from 'react-redux'
import _ from 'lodash'
import ScannedItemList from '../components/ScannedItemList'
import { orderOperations, orderSelectors } from '../ducks/order'

const mapStateToProps = state => {
  return {
    isProcessing: orderSelectors.isProcessing,
    isDeletingOrder: orderSelectors.isDeletingOrder,
    items: _(orderSelectors.unprocessedItems)
      .filter(id => {
        return state.orderEntities[id] &&
          state.orderEntities[id].TransType === state.orders.mode
      })
      .map(id => {
        const order = state.orderEntities[id]

        if (order) {
          let product

          if (order.ProductID) {
            product = state.productEntities[order.ProductID]
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

const mapDispatchToProps = dispatch => {
  return {
    onDeleteItemClick: id => {
      dispatch(orderOperations.startDeletingOrder(id))
    },
    onDeleteItemConfirm: id => {
      dispatch(orderOperations.deleteOrder(id))
    },
    onDeleteItemCancel: () => {
      dispatch(orderOperations.cancelDeletingOrder())
    },
    onChangeOrderQuantityClick: order => {
      dispatch(orderOperations.startChangingOrderQuantity(order))
    }
  }
}

const ScannedItemListContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ScannedItemList)

export default ScannedItemListContainer
