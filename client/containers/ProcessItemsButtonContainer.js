import { connect } from 'react-redux'
import { orderOperations, orderSelectors } from '../features/order'
import ProcessItemsButton from '../components/ProcessItemsButton'

const mapStateToProps = state => {
  return {
    mode: orderSelectors.modeSelector(state)
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onProcessItemsClick: () => {
      dispatch(orderOperations.processOrders())
    }
  }
}

const ProcessItemsButtonContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ProcessItemsButton)

export default ProcessItemsButtonContainer
