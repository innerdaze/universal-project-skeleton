import { connect } from 'react-redux'
import { orderOperations, orderSelectors } from '../ducks/order'
import ChangeOrderQuantityForm from '../components/ChangeOrderQuantityForm'

const mapStateToProps = state => {
  return {
    order: orderSelectors.changingOrderQuantityFor(state)
  }
}

const mapDispatchToProps = dispatch => {
  return {
    handleSubmit: (id, quantity) => {debugger
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
