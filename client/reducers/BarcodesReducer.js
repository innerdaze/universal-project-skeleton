import { map, keyBy, fromPairs } from 'lodash'

export function barcodes(state = {
  isFetching: false,
  didInvalidate: false,
  lastUpdated: null,
  items: []
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
    case 'RESET_BARCODES':
      return {
        ...state,
        items: []
      }
    default:
      return state
  }
}

export function barcodeEntities(state = {}, action) {
  switch (action.type) {
    case 'RECEIVE_BARCODES':
      return keyBy(action.barcodes, 'Barcode')
    default:
      return state
  }
}

export function barcodeIDsByProductID(state = {}, action) {
  switch (action.type) {
    case 'RECEIVE_BARCODES':
      return fromPairs(map(action.barcodes, barcode => [barcode.ProductID, barcode.Barcode]))
    case 'RESET_BARCODES':
      return {}
    default:
      return state
  }
}
