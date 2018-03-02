import { connect } from 'react-redux'
import ModeDisplay from '../components/ModeDisplay'
import { orderSelectors } from '../features/order'
const mapStateToProps = state => ({
  mode: orderSelectors.modeSelector(state)
})

export default connect(mapStateToProps)(ModeDisplay)
