import { connect } from 'react-redux'
import Root from '../components/Root'
import { errorOperations, errorSelectors } from '../ducks/error'
import { cashierSelectors } from '../ducks/cashier'
import { appSelectors } from '../ducks/app'
import { syncSelectors } from '../ducks/sync'
export default connect(
  state => {
    return {
      authed: Boolean(cashierSelectors.activeCashier(state)),
      initialized: appSelectors.isInitialized(state),
      error: errorSelectors.error(state),
      isSyncing: syncSelectors.isSyncing(state)
    }
  },
  dispatch => ({
    handleNotificationClose: () => {
      dispatch(errorOperations.dismissError())
    }
  })
)(Root)
