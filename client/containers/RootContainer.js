import { connect } from 'react-redux'
import Root from '../components/Root'
import { errorOperations, errorSelectors } from '../ducks/error'
import { cashierSelectors } from '../ducks/cashier'
import { appSelectors } from '../ducks/app'
import { syncSelectors } from '../ducks/sync'
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
