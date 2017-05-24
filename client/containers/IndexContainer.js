import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import Index from '../components/Index.jsx'

const mapStateToProps = state => ({
  isInitialized: state.app.isInitialized,
  isLoggedIn: state.session.alive
})

export default withRouter(connect(
  mapStateToProps
)(Index))
