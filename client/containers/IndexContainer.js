import { connect } from 'react-redux'
import Index from '../components/Index.jsx'

const mapStateToProps = state => ({
  isInitialized: state.app.isInitialized,
  isLoggedIn: state.session.alive
})

export default connect(
  mapStateToProps
)(Index)
