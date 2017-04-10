import { map, keyBy } from 'lodash'
import sampleBarcodes from '../test/fixtures/barcodes-sample.json'

export function barcodes(state = {
  isFetching: false,
  didInvalidate: false,
  lastUpdated: null,
  items: map(sampleBarcodes, 'Barcode')
}, action) {
  switch (action.type) {
    case 'INVALIDATE_BARCODES':
      return {
        ...state,
        didInvalidate: true
      }
    case 'REQUEST_BARCODES':
      return {
        ...state,
        isFetching: true,
        didInvalidate: false
      }
    case 'RECEIVE_BARCODES':
      return {
        ...state,
        isFetching: false,
        didInvalidate: false,
        items: map(action.barcodes, 'Barcode'),
        lastUpdated: action.receivedAt
      }
    default:
      return state
  }
}

export function barcodeEntities(state = keyBy(sampleBarcodes, 'Barcode'), action) {
  switch (action.type) {
    case 'RECEIVE_BARCODES':
      return keyBy(action.barcodes, 'Barcode')
    default:
      return state
  }
}
