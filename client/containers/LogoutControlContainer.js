import { connect } from 'react-redux'
import LogoutControl from '../components/LogoutControl'
//import { logoutCashier } from '../actions/CashierActions'
import {cashierOperations} from '../ducks/cashier'
export default connect(
  null,
  dispatch => ({
    handleLogoutPress: () => {
      dispatch(cashierOperations.logoutCashier())
    }
  })
)(LogoutControl)
