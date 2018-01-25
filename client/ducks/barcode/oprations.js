import actions from './actions'
import { networkOperations } from '../network'
import { errorOperations } from '../error'
  debugger

  const fetchBarcodes=() =>{
    return dispatch => {
      dispatch(requestBarcodes())
  
      return dispatch(networkOperations.callApi({
        service: 'HandheldService.GetBarcodes',
        params: {
          GetOptions: 0
        },
        success: json => dispatch(actions.receiveBarcodes(json.result.Result.ListOfBarcodes))
      }))
    }
  }
  
  const _findBarcodeByID=(barcodeID)=> {
    return function (dispatch, getState) {
      dispatch(actions.lookupBarcode(barcodeID))
  
      const barcode = getState().barcodeEntities[barcodeID]
  
      if (barcode) {
        dispatch(actions.succeedLookupBarcode(barcodeID))
        dispatch(errorOperations.dismissError())
      } else {
        dispatch(actions.failLookupBarcode(barcodeID))
        dispatch(errorOperations.displayError('No match for barcode'))
      }
  
      return barcode
    }
  }
  export default {
    fetchBarcodes,
    _findBarcodeByID
  }