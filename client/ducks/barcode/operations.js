import actions from './actions'
import { networkOperations } from '../network'
import { errorOperations } from '../error'

const barcodeAction = actions.barcode
const fetchBarcodes = () => {
  return dispatch => {
    dispatch(barcodeAction.requestBarcodes())

    return dispatch(
      networkOperations.callApi({
        service: 'HandheldService.GetBarcodes',
        params: {
          GetOptions: 0
        },
        success: json =>
          dispatch(
            barcodeAction.receiveBarcodes(json.result.Result.ListOfBarcodes)
          )
      })
    )
  }
}

const _findBarcodeByID = barcodeID => {
  return function(dispatch, getState) {
    dispatch(barcodeAction.lookupBarcode(barcodeID))

    const barcode = getState().barcodeEntities[barcodeID]

    if (barcode) {
      dispatch(barcodeAction.succeedLookupBarcode(barcodeID))
      dispatch(barcodeAction.dismissError())
    } else {
      dispatch(barcodeAction.failLookupBarcode(barcodeID))
      dispatch(errorOperations.displayError('No match for barcode'))
    }

    return barcode
  }
}
export default {
  fetchBarcodes,
  _findBarcodeByID
}
