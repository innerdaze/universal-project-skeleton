import { connect } from 'react-redux'
import LogoutControl from '../components/LogoutControl'
import { logoutCashier } from '../actions/CashierActions'

export default connect(
  null,
  dispatch => ({
    handleLogoutPress: () => {
      dispatch(logoutCashier())
    }
  })
)(LogoutControl)
