import { connect } from 'react-redux'
import OrdersLayout from '../components/OrdersLayout'
import { orderOperations, orderSelectors } from '../features/order'
import { wastageOperations, wastageSelectors } from '../features/wastage'
import { uiSelectors } from '../features/ui'

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
      dispatch(wastageOperations.startChangingWastageType(transaction))

      //dispatch(orderOperations.startChangingOrderQuantity(transaction))
    },
    onPromptStartModifyingCancel: () =>
      dispatch(orderOperations.cancelStartModifyTransaction()),
    onChangeWastageTypeClick: order =>
      dispatch(wastageOperations.startChangingWastageType(order))
  })
)(OrdersLayout)
