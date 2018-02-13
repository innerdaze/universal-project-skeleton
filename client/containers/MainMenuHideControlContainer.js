import { connect } from 'react-redux'
import { uiOperations } from '../ducks/ui'
import MainMenuHideControl from '../components/MainMenuHideControl'

const mapDispatchToProps = dispatch => {
  return {
    hideMenu: () => (
      dispatch(uiOperations.uiHideMenu())
    )
  }
}

export default connect(
  null,
  mapDispatchToProps
)(MainMenuHideControl)
