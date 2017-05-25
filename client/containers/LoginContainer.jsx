import { connect } from 'react-redux'
import Login from '../components/Login.jsx'
import { login } from '../actions/SessionActions'

const mapDispatchToProps = dispatch => ({
  login: (username, password) => {
    dispatch(login(username, password))
  },
})

const LoginContainer = connect(
  null,
  mapDispatchToProps
)(Login)

export default LoginContainer
