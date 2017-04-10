import { connect } from 'react-redux'
import BarcodeInputForm from '../components/BarcodeInputForm.jsx'
import { processBarcode } from '../actions/BarcodeActions'

const mapStateToProps = state => {
  return {}
}

const mapDispatchToProps = dispatch => {
  return {
    onSubmitBarcode: barcode => {
      dispatch(processBarcode(barcode))
    }
  }
}

const BarcodeInputFormContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(BarcodeInputForm)

export default BarcodeInputFormContainer
