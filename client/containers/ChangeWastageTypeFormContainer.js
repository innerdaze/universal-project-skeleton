import { connect } from 'react-redux'
import { wastageOperations, wastageSelectors } from '../features/wastage'
import ChangeWastageTypeForm from '../components/ChangeWastageTypeForm'
import { orderOperations, orderSelectors } from '~features/order'

const mapStateToProps = state => {
  return {
    order: wastageSelectors.changingWastageTypeForSelector(state),
<<<<<<< HEAD
    tempTransaction: orderSelectors.pendingTransactionSelector(state),
=======
    tempTransaction: orderSelectors.pendingTransactionSelector(state)
      ? orderSelectors.pendingTransactionSelector(state)
      : orderSelectors.pendingModificationSelector(state),
>>>>>>> 7324_wastage_flow_change
    wastageTypes: wastageSelectors.wastageTypeEntitiesSelector(state),
    wastageTypeForOrderId: orderId =>
      wastageSelectors.wastageTypeForOrderIdSelector(state, orderId)
  }
}

const mapDispatchToProps = dispatch => {
  return {
    handleSubmit: (id, type, transaction) => {
      dispatch(wastageOperations.updateWastageTypeMapping(id, type))
      dispatch(wastageOperations.finishChangingWastageType())
<<<<<<< HEAD
=======
      dispatch(orderOperations.confirmStartModifyTransaction())
>>>>>>> 7324_wastage_flow_change
      // to check if this is edit or add added by KK on 19/04/2018
      if (transaction)
        dispatch(orderOperations.startChangingOrderQuantity(transaction))
    },
    handleCancel: () => {
      dispatch(wastageOperations.cancelChangingWastageType())
      dispatch(wastageOperations.finishChangingWastageType())
    }
  }
}

const ChangeWastageTypeFormContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ChangeWastageTypeForm)

export default ChangeWastageTypeFormContainer
