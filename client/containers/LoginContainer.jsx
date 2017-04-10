import { connect } from 'react-redux'
import Login from '../components/Login.jsx'
import { login } from '../actions/SessionActions'

const mapStateToProps = (state) => {
  return {
    error: state.session.error && 'Could not login at this time. Please try again later or contact support'
  }
}

const mapDispatchToProps = dispatch => {
  return {
    login: (username, password) => {
      dispatch(login(username, password))
    }
  }
}

const LoginContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Login)

export default LoginContainer
