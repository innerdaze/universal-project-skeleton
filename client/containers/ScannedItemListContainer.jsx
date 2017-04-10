import { connect } from 'react-redux'
import ScannedItemList from '../components/ScannedItemList.jsx'
import { deleteOrder, changeOrderQuantity } from '../actions/OrderActions'

const mapStateToProps = state => {
  return {
    items: state.orders.unprocessedItems.filter(id => {
      return state.orderEntities[id]
    }).map(id => {
      const barcode = state.barcodeEntities[id]
      let order = state.orderEntities[id]

      if (order) {
        if (barcode) {
          let product = state.productEntities[barcode.ProductID]

          if (product) {
            order.productID = barcode.ProductID
            order.productName = product.ProductName

            return order
          }
        }

        order.productName = 'Error mapping barcode to product'
        order.productID = ''
      }

      return order || null
    })
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onDeleteItemClick: id => {
      dispatch(deleteOrder(id))
    }
  }
}

const ScannedItemListContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ScannedItemList)

export default ScannedItemListContainer
