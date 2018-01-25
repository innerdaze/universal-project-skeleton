import { connect } from 'react-redux'
import Root from '../components/Root'
import { errorOperations,errorSelectors } from '../ducks/error'
import { cashierSelectors } from '../ducks/cashier'
import { appSelectors } from '../ducks/app'
import { syncSelectors } from '../ducks/sync'
export default connect(
  state => ({
    authed: Boolean(cashierSelectors.activeCashier),
    initialized: appSelectors.isInitialized,
    error: errorSelectors.error,
    isSyncing: syncSelectors.isSyncing
  }),
  dispatch => ({
    handleNotificationClose: () => {
      dispatch(errorOperations.dismissError())
    }
  })
)(Root)
