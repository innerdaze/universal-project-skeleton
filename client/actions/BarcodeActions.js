import {
  REQUEST_BARCODES,
  RECEIVE_BARCODES,
  INVALIDATE_BARCODES,
  LOOKUP_BARCODE,
  SUCCEED_LOOKUP_BARCODE,
  FAIL_LOOKUP_BARCODE
} from '../constants/ActionTypes'
import { displayError, dismissError } from '../actions/ErrorActions'
import { failIfMissing } from '../helpers/Function'
import { callApi } from './NetworkActions'

export function requestBarcodes() {
  return {
    type: REQUEST_BARCODES
  }
}

export function receiveBarcodes(json) {
  return {
    type: RECEIVE_BARCODES,
    barcodes: json,
    receivedAt: Date.now()
  }
}

export function lookupBarcode(barcodeID) {
  return {
    type: LOOKUP_BARCODE,
    barcodeID
  }
}

export function failLookupBarcode(barcodeID) {
  return {
    type: FAIL_LOOKUP_BARCODE,
    barcodeID,
    error: `No match for barcode: ${barcodeID}`
  }
}

export function succeedLookupBarcode(barcodeID) {
  return {
    type: SUCCEED_LOOKUP_BARCODE,
    barcodeID
  }
}

export function fetchBarcodes() {
  return dispatch => {
    dispatch(requestBarcodes())

    return dispatch(callApi({
      service: 'HandheldService.GetBarcodes',
      params: {
        GetOptions: 0
      },
      success: json => dispatch(receiveBarcodes(json.result.Result.ListOfBarcodes))
    }))
  }
}

export function _findBarcodeByID(barcodeID) {
  return function (dispatch, getState) {
    dispatch(lookupBarcode(barcodeID))

    const barcode = getState().barcodeEntities[barcodeID]

    if (barcode) {
      dispatch(succeedLookupBarcode(barcodeID))
      dispatch(dismissError())
    } else {
      dispatch(failLookupBarcode(barcodeID))
      dispatch(displayError('No match for barcode'))
    }

    return barcode
  }
}

export function invalidateBarcodes() {
  return {
    type: INVALIDATE_BARCODES
  }
}
