import { connect } from 'react-redux'
import ModeDisplay from '../components/ModeDisplay'
import { orderSelectors } from '../ducks/order'
const mapStateToProps = state => (
  {
    mode: orderSelectors.mode
  }
)

export default connect(mapStateToProps)(ModeDisplay)
