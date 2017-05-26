import { connect } from 'react-redux'
import Root from '../components/Root'
import { dismissError } from '../actions/ErrorActions'

export default connect(
  state => ({
    authed: Boolean(state.cashiers.activeCashier),
    initialized: state.app.isInitialized,
    error: state.error.activeError,
    isSyncing: state.sync.isSyncing
  }),
  dispatch => ({
    handleNotificationClose: () => {
      dispatch(dismissError())
    }
  })
)(Root)
