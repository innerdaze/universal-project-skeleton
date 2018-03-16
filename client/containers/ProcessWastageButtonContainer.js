import { connect } from 'react-redux'
import { orderSelectors } from '../features/order'
import { wastageOperations } from '../features/wastage'
import ProcessItemsButton from '../components/ProcessItemsButton'

const mapStateToProps = state => {
  return {
    mode: orderSelectors.modeSelector(state)
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onProcessItemsClick: () => {
      dispatch(wastageOperations.processWastage())
    }
  }
}

const ProcessItemsButtonContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ProcessItemsButton)

export default ProcessItemsButtonContainer
