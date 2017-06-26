import { connect } from 'react-redux'
import { uiHideMenu } from '../actions/UIActions'
import MainMenuHideControl from '../components/MainMenuHideControl'

const mapDispatchToProps = dispatch => {
  return {
    hideMenu: () => (
      dispatch(uiHideMenu())
    )
  }
}

export default connect(
  null,
  mapDispatchToProps
)(MainMenuHideControl)
