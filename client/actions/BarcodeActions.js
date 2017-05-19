import fetch from 'isomorphic-fetch'
import { apiURL } from '../config'
import {
  REQUEST_BARCODES,
  RECEIVE_BARCODES,
  INVALIDATE_BARCODES,
  PROCESS_BARCODE,
  LOOKUP_BARCODE,
  SUCCEED_LOOKUP_BARCODE,
  FAIL_LOOKUP_BARCODE
} from '../constants/ActionTypes'
import { createTransaction } from './OrderActions'
import { failIfMissing } from '../helpers/Function.js'

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
    barcodeID: barcodeID
  }
}

export function failLookupBarcode(barcodeID) {
  return {
    type: FAIL_LOOKUP_BARCODE,
    barcodeID: barcodeID,
    error: `No match for barcode: ${barcodeID}`
  }
}

export function succeedLookupBarcode(barcodeID) {
  return {
    type: SUCCEED_LOOKUP_BARCODE,
    barcodeID: barcodeID
  }
}

export function fetchBarcodes(sessionID = failIfMissing('sessionID', 'fetchBarcodes')) {
  return function (dispatch) {
    dispatch(requestBarcodes())

    return fetch(apiURL, {
      method: 'post',
      body: JSON.stringify({
        method: 'HandheldService.GetBarcodes',
        params: {
          SessionID: sessionID,
          GetOptions: 0
        }
      })
    })
      .then(response => response.json())
      .then(json => dispatch(receiveBarcodes(json.result.Result.ListOfBarcodes)))
  }
}

export function _findBarcodeByID(barcodeID) {
  return function (dispatch, getState) {
    dispatch(lookupBarcode(barcodeID))

    const barcode = getState().barcodeEntities[barcodeID]

    if (barcode) {
      dispatch(succeedLookupBarcode(barcodeID))
    } else {
      dispatch(failLookupBarcode(barcodeID))
    }

    return barcode
  }
}

export function createTransactionFromBarcode(barcodeID) {
  return function (dispatch, getState) {
    const found = dispatch(_findBarcodeByID(barcodeID))

    if (found) {
      dispatch(createTransaction(getState().orders.mode, barcodeID, 1))
    }
  }
}

export function invalidateBarcodes() {
  return {
    type: INVALIDATE_BARCODES
  }
}
