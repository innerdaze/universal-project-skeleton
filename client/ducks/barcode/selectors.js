import { createSelector } from 'reselect'

const lastError = state => state.barcode.barcodeLookup.lastError
const barcodeEntitiesSelector = state => state.barcode.barcodeEntities

export default {
  lastError,
  barcodeEntitiesSelector
}
