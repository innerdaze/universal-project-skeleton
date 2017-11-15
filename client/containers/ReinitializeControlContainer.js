import { connect } from 'react-redux'
import ReinitializeControl from '../components/ReinitializeControl'
import { reset } from '../actions/AppActions'

export default connect(
  null,
  dispatch => ({
    handleReinitializePress: () => {
      dispatch(reset())
    }
  })
)(ReinitializeControl)
