import { connect } from 'react-redux'
import { setApiRoot } from '../actions/AppActions'
import Initialize from '../components/Initialize.jsx'

export default connect(null, dispatch => ({
  onApiRootFormSubmit: config => dispatch(setApiRoot(config))
}))(Initialize)
