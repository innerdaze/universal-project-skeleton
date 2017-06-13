import { connect } from 'react-redux'
import BarcodeInputForm from '../components/BarcodeInputForm.jsx'
import { createTransactionFromBarcodeID } from '../actions/BarcodeActions'

const mapStateToProps = state => {
  return {
    error: state.barcodeLookup.lastError,
    shouldFocusField: !state.ui.mainMenuVisible
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onSubmitBarcode: barcode => (
      dispatch(createTransactionFromBarcodeID(barcode))
    )
  }
}

const BarcodeInputFormContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(BarcodeInputForm)

export default BarcodeInputFormContainer
