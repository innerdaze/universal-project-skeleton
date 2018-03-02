import { connect } from 'react-redux'
import Root from '../components/Root'
import { errorOperations, errorSelectors } from '../features/error'
import { cashierSelectors } from '../features/cashier'
import { appSelectors } from '../features/app'
import { syncSelectors } from '../features/sync'
import { withRouter } from 'react-router-dom'

export default connect(
  state => ({
    authed: Boolean(cashierSelectors.activeCashier(state)),
    initialized: appSelectors.isInitialized(state),
    error: errorSelectors.error(state),
    isSyncing: syncSelectors.isSyncing(state)
  }),
  dispatch => ({
    handleNotificationClose: () => {
      dispatch(errorOperations.dismissError())
    }
  })
)(Root)
