import { connect } from 'react-redux'
import Root from '../components/Root'
import { dismissError } from '../actions/ErrorActions'

export default connect(
  state => ({
    authed: state.session.alive,
    initialized: state.app.isInitialized,
    error: state.error.activeError
  }),
  dispatch => ({
    handleNotificationClose: () => {
      dispatch(dismissError())
    }
  })
)(Root)
