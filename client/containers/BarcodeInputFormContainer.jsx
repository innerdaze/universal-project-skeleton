import { connect } from 'react-redux'
import BarcodeInputForm from '../components/BarcodeInputForm'
import { orderOperations,orderSelectors } from '../ducks/order'
import { barcodeSelectors } from '../ducks/barcode'
import { syncSelectors } from '../ducks/sync'
import { uiSelectors } from '../ducks/ui'
//import { orderSelectors } from '../ducks/barcode'
const mapStateToProps = state => {
  return {
    error: barcodeSelectors.lastError(state),
    shouldFocusField: (
        !uiSelectors.mainMenuVisible(state) &&
        !orderSelectors.isChangingOrderQuantity(state) &&
        !orderSelectors.pendingModification(state) &&
        !orderSelectors.isProcessing(state) &&
        !orderSelectors.pendingTransaction(state) &&
        !orderSelectors.isDeletingOrder(state) &&
        !syncSelectors.isSyncing(state)
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onSubmitBarcode: barcodeID => (
      dispatch(orderOperations.createPendingTransactionByBarcodeID(barcodeID))
    )
  }
}

const BarcodeInputFormContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(BarcodeInputForm)

export default BarcodeInputFormContainer
