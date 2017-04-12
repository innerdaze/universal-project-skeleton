import { connect } from 'react-redux'
import { changeOperationMode } from '../actions/OrderActions'
import ModeSwitcher from '../components/ModeSwitcher.jsx'

const mapStateToProps = state => {
  return {}
}

const mapDispatchToProps = dispatch => {
  return {
    onSwitch: mode => {
      dispatch(changeOperationMode(mode))
    }
  }
}

const ModeSwitcherContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ModeSwitcher)

export default ModeSwitcherContainer
