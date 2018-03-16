import { connect } from 'react-redux'
import { wastageOperations, wastageSelectors } from '../features/wastage'
import ChangeWastageTypeForm from '../components/ChangeWastageTypeForm'

const mapStateToProps = state => {
  return {
    order: wastageSelectors.changingWastageTypeForSelector(state),
    wastageTypes: wastageSelectors.wastageTypeEntitiesSelector(state),
    wastageTypeForOrderId: orderId =>
      wastageSelectors.wastageTypeForOrderIdSelector(state, orderId)
  }
}

const mapDispatchToProps = dispatch => {
  return {
    handleSubmit: (id, type) => {
      dispatch(wastageOperations.updateWastageTypeMapping(id, type))
      dispatch(wastageOperations.finishChangingWastageType())
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
