import { connect } from 'react-redux'
import OrdersLayout from '../components/OrdersLayout.jsx'
import { completPendingTransaction, discardPendingTransaction } from '../actions/OrderActions'

export default connect(
  state => ({
    mainMenuVisible: state.ui.mainMenuVisible,
    pendingTransaction: state.orders.pendingTransaction
  }),
  dispatch => ({
    onChangeOrderQuantitySubmit: (quantity) => dispatch(completPendingTransaction(quantity)),
    onChangeOrderQuantityCancel: () => dispatch(discardPendingTransaction())
  })
)(OrdersLayout)
