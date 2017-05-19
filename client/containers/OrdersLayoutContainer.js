import { connect } from 'react-redux'
import OrdersLayout from '../components/OrdersLayout.jsx'

const mapStateToProps = state => {
  return {
    mainMenuVisible: state.ui.mainMenuVisible
  }
}

export default connect(mapStateToProps)(OrdersLayout)
