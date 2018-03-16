import { connect } from 'react-redux'
import { orderSelectors } from '../ducks/order'
import { wastageOperations } from '../ducks/wastage'
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
