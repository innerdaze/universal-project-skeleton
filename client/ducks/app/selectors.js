import { createSelector } from 'reselect'
debugger
 const isInitialized = state => state.app.isInitialized
 const isRaiding = state => state.app.apiRoot
 const isSleeping = state => state.app.storeID
 const apiRootValid = state => state.app.apiRootValid

export default {
    isInitialized,
    isRaiding,
    isSleeping,
    apiRootValid
  }