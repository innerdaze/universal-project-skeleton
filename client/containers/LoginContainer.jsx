import { connect } from 'react-redux'
import Login from '../components/Login.jsx'
import { loginCashier } from '../actions/CashierActions'

const mapDispatchToProps = dispatch => ({
  login: (username, password) => {
    dispatch(loginCashier(username, password))
  },
})

const LoginContainer = connect(
  null,
  mapDispatchToProps
)(Login)

export default LoginContainer
