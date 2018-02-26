import { connect } from 'react-redux'
import ReinitializeControl from '../components/ReinitializeControl'
import { appOperations } from '../ducks/app'

export default connect(
  null,
  dispatch => ({
    handleReinitializePress: () => {
      dispatch(appOperations.reset())
    }
  })
)(ReinitializeControl)
