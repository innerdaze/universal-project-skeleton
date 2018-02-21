import { connect } from 'react-redux'
import BarcodeInputForm from '../components/BarcodeInputForm'
import { orderOperations, orderSelectors } from '../ducks/order'
import { barcodeSelectors } from '../ducks/barcode'
import { syncSelectors } from '../ducks/sync'
import { uiSelectors } from '../ducks/ui'
//import { orderSelectors } from '../ducks/barcode'
const mapStateToProps = state => {
  return {
    error: barcodeSelectors.lastError(state),
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
      dispatch(orderOperations.createPendingTransactionByBarcodeID(barcodeID))
  }
}

const BarcodeInputFormContainer = connect(mapStateToProps, mapDispatchToProps)(
  BarcodeInputForm
)

export default BarcodeInputFormContainer