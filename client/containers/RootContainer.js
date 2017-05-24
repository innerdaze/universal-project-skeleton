import { connect } from 'react-redux'
import Root from '../components/Root'

export default connect(
  state => ({
    authed: state.session.alive,
    initialized: state.app.isInitialized
  })
)(Root)
