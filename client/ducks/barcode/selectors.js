import { createSelector } from 'reselect'

 const lastError = state => state.barcode.lastError
 const isRaiding = state => state.app.apiRoot
 const isSleeping = state => state.app.storeID
 const apiRootValid = state => state.app.apiRootValid

export default {
    isInitialized,
    isRaiding,
    isSleeping,
    apiRootValid
  }