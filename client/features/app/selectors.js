import { createSelector } from 'reselect'
export const isInitialized = state => state.app.isInitialized
export const apiRoot = state => state.app.apiRoot
export const storeID = state => state.app.storeID
export const apiRootValid = state => state.app.apiRootValid
export const allowPriceUpdateSelector = state => state.app.allowPriceUpdate

export default {
  isInitialized,
  apiRoot,
  storeID,
  apiRootValid,
  allowPriceUpdateSelector
}
