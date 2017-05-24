import { connect } from 'react-redux'
import Login from '../components/Login.jsx'
import { login } from '../actions/SessionActions'
import { push } from 'connected-react-router'

const mapStateToProps = state => ({
  error: state.session.error && 'Could not login at this time. Please try again later or contact support'
})

const mapDispatchToProps = dispatch => ({
  login: (username, password) => {
    dispatch(login(username, password))
  },
  redirectToInitialize: () => {
    dispatch(push('/initialize'))
  }
})

const LoginContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Login)

export default LoginContainer
