import { connect } from 'react-redux'
import { changeOrderQuantity } from '../actions/OrderActions'
import ChangeOrderQuantityForm from '../components/ChangeOrderQuantityForm.jsx'

const mapStateToProps = state => {
  return {}
}

const mapDispatchToProps = dispatch => {
  return {
    onSubmit: (id, quantity) => {
      dispatch(changeOrderQuantity(id, quantity))
    }
  }
}

const ChangeOrderQuantityFormContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ChangeOrderQuantityForm)

export default ChangeOrderQuantityFormContainer
