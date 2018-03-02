import { createSelector } from 'reselect'

const isSyncing = state => state.sync.isSyncing
const progress = state => state.sync.progress
export default {
  isSyncing,
  progress
}