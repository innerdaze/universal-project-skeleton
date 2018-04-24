import { connect } from 'react-redux'
import { orderOperations, orderSelectors } from '../features/order'
import { inventorySelectors } from '../features/inventory'
import ChangeOrderQuantityForm from '../components/ChangeOrderQuantityForm'
import { wastageOperations } from '../features/wastage'
const mapStateToProps = state => {
  return {
    mode: orderSelectors.modeSelector(state),
    order: inventorySelectors.currentlyChangeQuantityForWithProductSelector(
      state
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    handleSubmit: (id, quantity) => {
      dispatch(orderOperations.changeOrderQuantity(id, quantity))
      dispatch(orderOperations.finishChangingOrderQuantity())
    },
    handleCancel: () => {
      dispatch(orderOperations.cancelChangingOrderQuantity())
      dispatch(orderOperations.finishChangingOrderQuantity())
    }
  }
}

const ChangeOrderQuantityFormContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ChangeOrderQuantityForm)

export default ChangeOrderQuantityFormContainer
