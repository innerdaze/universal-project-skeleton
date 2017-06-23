import { connect } from 'react-redux'
import {
  changeOrderQuantity,
  finishChangingOrderQuantity,
  cancelChangingOrderQuantity
} from '../actions/OrderActions'
import ChangeOrderQuantityForm from '../components/ChangeOrderQuantityForm.jsx'

const mapStateToProps = state => {
  return {
    order: state.orders.changingOrderQuantityFor
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onSubmit: (id, quantity) => {
      dispatch(changeOrderQuantity(id, quantity))
      dispatch(finishChangingOrderQuantity())
    },
    onCancel: () => {
      dispatch(cancelChangingOrderQuantity())
      dispatch(finishChangingOrderQuantity())
    }
  }
}

const ChangeOrderQuantityFormContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ChangeOrderQuantityForm)

export default ChangeOrderQuantityFormContainer
