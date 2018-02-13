import { createSelector } from 'reselect'

 const lastError = state => state.barcode.barcodeLookup.lastError

export default {
    lastError
  }