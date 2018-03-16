import { connect } from 'react-redux'
import OrdersLayout from '../components/OrdersLayout'
import { orderOperations, orderSelectors } from '../ducks/order'
import { wastageSelectors, wastageOperations } from '../ducks/wastage'
import { uiSelectors } from '../ducks/ui'

export default connect(
  state => ({
    mainMenuVisible: uiSelectors.mainMenuVisible(state),
    pendingTransaction: orderSelectors.pendingTransactionSelector(state),
    pendingModification: orderSelectors.pendingModificationSelector(state),
    isChangingOrderQuantity: orderSelectors.isChangingOrderQuantitySelector(
      state
    ),
    isChangingWastageType: wastageSelectors.isChangingWastageTypeSelector(
      state
    ),
    activeMode: orderSelectors.modeSelector(state),
    wastageTypeNameForOrderId: orderId => {
      const type = wastageSelectors.wastageTypeForOrderIdSelector(
        state,
        orderId
      )
      return type && type.Name
    }
  }),
  dispatch => ({
    onPromptStartModifyingSubmit: transaction => {
      dispatch(orderOperations.confirmStartModifyTransaction())
      dispatch(orderOperations.startChangingOrderQuantity(transaction))
    },
    onPromptStartModifyingCancel: () =>
      dispatch(orderOperations.cancelStartModifyTransaction()),
    onChangeWastageTypeClick: order =>
      dispatch(wastageOperations.startChangingWastageType(order))
  })
)(OrdersLayout)
