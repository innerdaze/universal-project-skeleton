import { connect } from 'react-redux'
import _, { reverse } from 'lodash'
import ScannedItemList from '../components/ScannedItemList.jsx'
import {
  deleteOrder,
  startDeletingOrder,
  changeOrderQuantity,
  startChangingOrderQuantity
} from '../actions/OrderActions'

const mapStateToProps = state => {
  return {
    isProcessing: state.orders.isProcessing,
    isDeletingOrder: state.orders.isDeletingOrder,
    // TODO: optimization needed
    items: _(state.orders.unprocessedItems)
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
      dispatch(startDeletingOrder(id))
    },
    onDeleteItemConfirm: id => {
      dispatch(deleteOrder(id))
    },
    onChangeOrderQuantityClick: order => {
      dispatch(startChangingOrderQuantity(order))
    }
  }
}

const ScannedItemListContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ScannedItemList)

export default ScannedItemListContainer
