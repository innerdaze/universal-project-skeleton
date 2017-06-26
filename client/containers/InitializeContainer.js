import { connect } from 'react-redux'
import { setApiRoot } from '../actions/AppActions'
import Initialize from '../components/Initialize'

export default connect(state => ({
  isLoggedIn: state.session.alive,
  isInitialized: state.app.isInitialized,
  apiRootValidationError: state.validation.apiRoot
}), dispatch => ({
  onApiRootFormSubmit: config => dispatch(setApiRoot(config))
}))(Initialize)
