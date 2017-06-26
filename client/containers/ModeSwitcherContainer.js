import { connect } from 'react-redux'
import { changeOperationMode } from '../actions/OrderActions'
import { uiHideMenu } from '../actions/UIActions'
import ModeSwitcher from '../components/ModeSwitcher'

const mapDispatchToProps = dispatch => {
  return {
    onSwitch: mode => {
      dispatch(changeOperationMode(mode))
      dispatch(uiHideMenu())
    }
  }
}

const ModeSwitcherContainer = connect(
  null,
  mapDispatchToProps
)(ModeSwitcher)

export default ModeSwitcherContainer
