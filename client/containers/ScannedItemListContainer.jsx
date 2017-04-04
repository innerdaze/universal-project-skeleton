import { connect } from 'react-redux'
import ScannedItemList from '../components/ScannedItemList.jsx'
import { deleteOrder, changeOrderQuantity } from '../actions/OrderActions'

const mapStateToProps = state => {
  return {
    items: state.orders.items
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onDeleteItemClick: id => {
      dispatch(deleteOrder(id))
    },
    onChangeOrderQuantity: id => {
      dispatch(changeOrderQuantity(id))
    }
  }
}

const ScannedItemListContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ScannedItemList)

export default ScannedItemListContainer
