import { connect } from 'react-redux'
import ModeDisplay from '../components/ModeDisplay.jsx'

const mapStateToProps = state => (
  {
    mode: state.orders.mode
  }
)

export default connect(mapStateToProps)(ModeDisplay)
