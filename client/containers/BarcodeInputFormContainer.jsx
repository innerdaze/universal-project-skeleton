import { connect } from 'react-redux'
import BarcodeInputForm from '../components/BarcodeInputForm.jsx'
import { createTransactionFromBarcode } from '../actions/BarcodeActions'

const mapStateToProps = state => {
  return {
    error: state.barcodeLookup.lastError
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onSubmitBarcode: barcode => (
      dispatch(createTransactionFromBarcode(barcode))
    )
  }
}

const BarcodeInputFormContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(BarcodeInputForm)

export default BarcodeInputFormContainer
