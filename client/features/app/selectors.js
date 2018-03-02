import { createSelector } from 'reselect'
const isInitialized = state => state.app.isInitialized
const apiRoot = state => state.app.apiRoot
const storeID = state => state.app.storeID
const apiRootValid = state => state.app.apiRootValid
const allowPriceUpdateSelector = state => state.app.allowPriceUpdate

export default {
  isInitialized,
  apiRoot,
  storeID,
  apiRootValid,
  allowPriceUpdateSelector
}
