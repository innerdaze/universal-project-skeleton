import { connect } from 'react-redux'
import { orderOperations, orderSelectors } from '../features/order'
import { uiOperations } from '../features/ui'
import ModeSwitcher from '../components/ModeSwitcher'

const mapDispatchToProps = dispatch => {
  return {
    onSwitch: mode => {
      dispatch(orderOperations.changeOperationMode(mode))
      dispatch(uiOperations.uiHideMenu())
    }
  }
}

const ModeSwitcherContainer = connect(
  state => ({
    activeMode: orderSelectors.modeSelector(state)
  }),
  mapDispatchToProps
)(ModeSwitcher)

export default ModeSwitcherContainer
