import { connect } from 'react-redux'
import { orderOperations } from '../ducks/order'
import { uiOperations } from '../ducks/ui'
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
  null,
  mapDispatchToProps
)(ModeSwitcher)

export default ModeSwitcherContainer
