import { connect } from 'react-redux'
import BarcodeInputForm from '../components/BarcodeInputForm'
import { createPendingTransactionByBarcodeID } from '../actions/OrderActions'

const mapStateToProps = state => {
  return {
    error: state.barcodeLookup.lastError,
    shouldFocusField: (
        !state.ui.mainMenuVisible &&
        !state.orders.isChangingOrderQuantity &&
        !state.orders.pendingModification &&
        !state.orders.isProcessing &&
        !state.orders.pendingTransaction &&
        !state.orders.isDeletingOrder &&
        !state.sync.isSyncing
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onSubmitBarcode: barcodeID => (
      dispatch(createPendingTransactionByBarcodeID(barcodeID))
    )
  }
}

const BarcodeInputFormContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(BarcodeInputForm)

export default BarcodeInputFormContainer
