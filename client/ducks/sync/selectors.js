import { createSelector } from 'reselect'

 const isSyncing = state => state.sync.isSyncing

export default {
  isSyncing
  }