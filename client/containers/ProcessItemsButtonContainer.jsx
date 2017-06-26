import { connect } from 'react-redux'
import { processOrders } from '../actions/OrderActions'
import ProcessItemsButton from '../components/ProcessItemsButton'

const mapStateToProps = state => {
  return {
    mode: state.orders.mode
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onProcessItemsClick: () => {
      dispatch(processOrders())
    }
  }
}

const ProcessItemsButtonContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ProcessItemsButton)

export default ProcessItemsButtonContainer
