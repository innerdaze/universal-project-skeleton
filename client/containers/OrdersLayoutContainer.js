import { connect } from 'react-redux'
import OrdersLayout from '../components/OrdersLayout'
import { orderOperations, orderSelectors } from '../ducks/order'
import { uiSelectors } from '../ducks/ui'

export default connect(
  state => ({
    mainMenuVisible: uiSelectors.mainMenuVisible(state),
    pendingTransaction: orderSelectors.pendingTransaction(state),
    pendingModification: orderSelectors.pendingModification(state),
    isChangingOrderQuantity: orderSelectors.isChangingOrderQuantity(state),
    changingOrderQuantityFor: orderSelectors.changingOrderQuantityFor(state)
  }),
  dispatch => ({
    onPromptStartModifyingSubmit: transaction => {
      dispatch(orderOperations.confirmStartModifyTransaction())
      dispatch(orderOperations.startChangingOrderQuantity(transaction))
    },
    onPromptStartModifyingCancel: () =>
      dispatch(orderOperations.cancelStartModifyTransaction())
  })
)(OrdersLayout)
