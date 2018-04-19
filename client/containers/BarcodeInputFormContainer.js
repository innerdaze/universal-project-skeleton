import { connect } from 'react-redux'
import BarcodeInputForm from '../components/BarcodeInputForm'
import { orderOperations, orderSelectors } from '../features/order'
import { barcodeSelectors } from '../features/barcode'
import { syncSelectors } from '../features/sync'
import { uiSelectors } from '../features/ui'
import { wastageOperations } from '../features/wastage'
const mapStateToProps = state => {
  return {
    error: barcodeSelectors.lastError(state),
    orderMode: orderSelectors.modeSelector(state),
    shouldFocusField:
      !uiSelectors.mainMenuVisible(state) &&
      !orderSelectors.isChangingOrderQuantitySelector(state) &&
      !orderSelectors.pendingModificationSelector(state) &&
      !orderSelectors.isProcessingSelector(state) &&
      !orderSelectors.pendingTransactionSelector(state) &&
      !orderSelectors.isDeletingOrderSelector(state) &&
      !syncSelectors.isSyncing(state)
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onSubmitBarcode: barcodeID =>
      dispatch(orderOperations.submitBarcode(barcodeID))
  }
}

const BarcodeInputFormContainer = connect(mapStateToProps, mapDispatchToProps)(
  BarcodeInputForm
)

export default BarcodeInputFormContainer
