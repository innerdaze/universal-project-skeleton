import fetch from 'isomorphic-fetch'
import { apiURL } from '../config'
import {
  REQUEST_BARCODES,
  RECEIVE_BARCODES,
  INVALIDATE_BARCODES,
  PROCESS_BARCODE
} from '../constants/ActionTypes'
import { addOrder } from './OrderActions'

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

export function fetchBarcodes(sessionID) {
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
      .then(json => {
        dispatch(receiveBarcodes(json.result.Result.ListOfBarcodes))
      })
  }
}

export function invalidateBarcodes() {
  return {
    type: INVALIDATE_BARCODES
  }
}

export function processBarcode(barcode) {
  return function (dispatch) {

    const order = {
      __type: 'HandheldTrans',
      AreaID: '',
      Barcode: barcode.Barcode,
      Qty: 1,
      Ref1: '',
      Ref2: '',
      // TermianlID: store.getState().terminalID,
      // TransDate: now.toISOString().substr(-1),
      TransType: 10,
      UnitID: '',
      // UserID: store.getState().user.id
    }

    dispatch(addOrder(barcode.Barcode, order))
  }
}
