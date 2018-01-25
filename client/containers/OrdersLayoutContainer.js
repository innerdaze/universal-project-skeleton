import { connect } from 'react-redux'
import OrdersLayout from '../components/OrdersLayout'
import { orderOperations,orderSelectors } from '../ducks/order'

export default connect(
  state => ({
    mainMenuVisible: uiSelectors.mainMenuVisible,
    pendingTransaction: orderSelectors.pendingTransaction,
    pendingModification: orderSelectors.pendingModification,
    isChangingOrderQuantity: orderSelectors.isChangingOrderQuantity,
    changingOrderQuantityFor: orderSelectors.changingOrderQuantityFor
  }),
  dispatch => ({
    onPromptStartModifyingSubmit: transaction => {
      dispatch(orderOperations.confirmStartModifyTransaction())
      dispatch(orderOperations.startChangingOrderQuantity(transaction))
    },
    onPromptStartModifyingCancel: () => dispatch(orderOperations.cancelStartModifyTransaction())
  })
)(OrdersLayout)
