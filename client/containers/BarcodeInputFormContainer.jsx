import { connect } from 'react-redux'
import BarcodeInputForm from '../components/BarcodeInputForm.jsx'
import { processBarcode } from '../actions/BarcodeActions'

const mapStateToProps = state => {
  return {
    mode: state.orders.mode,
    barcodes: state.barcodeEntities
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onSubmitBarcode: (barcode, mode) => {
      dispatch(processBarcode(barcode, mode))
    }
  }
}

const BarcodeInputFormContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(BarcodeInputForm)

export default BarcodeInputFormContainer
