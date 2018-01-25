import { connect } from 'react-redux'
import BarcodeInputForm from '../components/BarcodeInputForm'
import { orderOperations } from '../ducks/order'
import { barcodeSelectors } from '../ducks/barcode'
import { syncSelectors } from '../ducks/sync'
import { uiSelectors } from '../ducks/ui'
import { orderSelectors } from '../ducks/barcode'
const mapStateToProps = state => {
  return {
    error: barcodeSelectors.lastError,
    shouldFocusField: (
        !uiSelectors.mainMenuVisible &&
        !orderSelectors.isChangingOrderQuantity &&
        !orderSelectors.pendingModification &&
        !orderSelectors.isProcessing &&
        !orderSelectors.pendingTransaction &&
        !orderSelectors.isDeletingOrder &&
        !syncSelectors.isSyncing
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
