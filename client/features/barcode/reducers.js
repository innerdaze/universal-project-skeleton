import { combineReducers } from 'redux'
import { handleActions } from 'redux-actions'
import actions from './actions'
import { keyBy, fromPairs, map } from 'lodash'
const { barcode } = actions

const initialStateBarcodeLookup = {
  lastQuery: null,
  lastError: null
}

const initialStateBarcode = {
  isFetching: false,
  didInvalidate: false,
  lastUpdated: null,
  items: []
}

const initialStateBarcodeEntities = {}
const initialStateBarcodeIDsByProductID = {}

export const barcodeLookup = handleActions(
  {
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
    [barcode.succeedLookupBarcode](state) {
      return {
        ...state,
        lastError: null
      }
    }
  },
  initialStateBarcodeLookup
)

export const barcodes = handleActions(
  {
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
  },
  initialStateBarcode
)

export const barcodeEntities = handleActions(
  {
    [barcode.receiveBarcodes](state, { payload: { json } }) {
      return keyBy(json.filter(item => !item.Deleted), 'Barcode')
    }
  },
  initialStateBarcodeEntities
)

export const barcodeIDsByProductID = handleActions(
  {
    [barcode.receiveBarcodes](state, { payload: { json } }) {
      return fromPairs(
        map(json.filter(item => !item.Deleted), ({ ProductID, Barcode }) => [
          ProductID,
          Barcode
        ])
      )
    },
    [barcode.resetBarcodes](state) {
      return {}
    }
  },
  initialStateBarcodeIDsByProductID
)

export default combineReducers({
  barcodeLookup,
  barcodes,
  barcodeEntities,
  barcodeIDsByProductID
})
