import { connect } from 'react-redux'
import OrdersLayout from '../components/OrdersLayout'
import { orderOperations, orderSelectors } from '../ducks/order'
import { uiSelectors } from '../ducks/ui'

export default connect(
  state => ({
    mainMenuVisible: uiSelectors.mainMenuVisible(state),
    pendingTransaction: orderSelectors.pendingTransactionSelector(state),
    pendingModification: orderSelectors.pendingModificationSelector(state),
    isChangingOrderQuantity: orderSelectors.isChangingOrderQuantitySelector(
      state
    ),
    changingOrderQuantityFor: orderSelectors.changingOrderQuantityForSelector(
      state
    )
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
