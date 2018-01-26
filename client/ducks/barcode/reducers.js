import { combineReducers } from 'redux'
import { handleActions } from 'redux-actions'
import actions from './actions'
import { keyBy, fromPairs } from 'lodash'
const { barcode } = actions
const initialStatebarcodeLookup = {
  lastQuery: null,
  lastError: null
}

const initialStatebarcode = {
  isFetching: false,
  didInvalidate: false,
  lastUpdated: null,
  items: []
}

const initialStatebarcodeEntities = {}
const initialStatebarcodeIDsByProductID = {}

const reducerbarcodeLookup = handleActions({
  [barcode.lookupBarcode](state, { payload: { barcodeID } }) {
    return {
      ...state,
      barcodeID,
      lastQuery: barcodeID
    }
  },
  [barcode.failLookupBarcode](state, { payload: { barcodeID } }) {
    return {
      ...state,
      lastError: `No match for barcode: ${barcodeID}`
    }
  },
  [barcode.succeddLookupBarcode](state) {
    return {
      ...state,
      lastError: null
    }
  }
}, initialStatebarcodeLookup)

const reducerbarcodes = handleActions({
  [barcode.invalidateBarcodes](state) {
    return {
      ...state,
      didInvalidate: true
    }
  },
  [barcode.requestBarcodes](state) {
    return {
      ...state,
      isFetching: true,
      didInvalidate: false
    }
  },
  [barcode.receiveBarcodes](state, { payload: { json } }) {
    return {
      ...state,
      isFetching: false,
      didInvalidate: false,
      items: map(json.filter(item => !item.Deleted), 'Barcode'),
      lastUpdated: Date.now()
    }
  },
  [barcode.resetBarcodes](state) {
    return {
      ...state,
      items: []
    }
  }
}, initialStatebarcode)

const reducerbarcodeEntities = handleActions({
  [barcode.receiveBarcodes](state, { payload: { json } }) {
    return keyBy(json.filter(item => !item.Deleted), 'Barcode')
  }
}, initialStatebarcodeEntities)

const reducerbarcodeIDsByProductID = handleActions({
  [barcode.receiveBarcodes](state, { payload: { json } }) {
    return fromPairs(map(json.filter(item => !item.Deleted), barcode => [barcode.ProductID, barcode.Barcode]))
  },
  [barcode.resetBarcodes](state) {
    return {}
  }
}, initialStatebarcodeIDsByProductID)

const reducer = combineReducers(reducerbarcodeLookup, reducerbarcodes, reducerbarcodeEntities, reducerbarcodeIDsByProductID)

export default reducer
