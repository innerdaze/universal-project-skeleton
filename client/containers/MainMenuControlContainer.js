import { connect } from 'react-redux'
import { uiShowMenu } from '../actions/UIActions'
import MainMenuControl from '../components/MainMenuControl'

const mapDispatchToProps = dispatch => {
  return {
    showMenu: () => (
      dispatch(uiShowMenu())
    )
  }
}

const MainMenuControlContainer = connect(
  null,
  mapDispatchToProps
)(MainMenuControl)

export default MainMenuControlContainer
