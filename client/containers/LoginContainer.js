import { connect } from 'react-redux'
import Login from '../components/Login'
//import { loginCashier } from '../ducs/cashier'
import {cashierOperations} from '../ducks/cashier'
const mapDispatchToProps = dispatch => ({
  login: (username, password) => {
    dispatch(cashierOperations.loginCashier(username, password))
  }
})

const LoginContainer = connect(
  null,
  mapDispatchToProps
)(Login)

export default LoginContainer
