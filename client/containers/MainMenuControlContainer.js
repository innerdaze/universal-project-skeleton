import { connect } from 'react-redux'
import { uiOperations } from '../ducks/ui'
import MainMenuControl from '../components/MainMenuControl'

const mapDispatchToProps = dispatch => {
  return {
    showMenu: () => (
      dispatch(uiOperations.uiShowMenu())
    )
  }
}

const MainMenuControlContainer = connect(
  null,
  mapDispatchToProps
)(MainMenuControl)

export default MainMenuControlContainer
