import { connect } from 'react-redux'
import { setApiRoot } from '../actions/AppActions'
import Initialize from '../components/Initialize.jsx'

export default connect(state => ({
  isLoggedIn: state.session.alive,
  isInitialized: state.app.isInitialized
}), dispatch => ({
  onApiRootFormSubmit: config => dispatch(setApiRoot(config))
}))(Initialize)
