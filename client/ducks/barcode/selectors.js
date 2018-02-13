import { createSelector } from 'reselect'

 const lastError = state => state.barcode.lastError

export default {
    lastError
  }