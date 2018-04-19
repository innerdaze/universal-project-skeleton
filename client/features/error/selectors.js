import { createSelector } from 'reselect'

const error = state => state.error.activeError
const isOffline = state => state.error.offlineFlag
export default {
  error,
  isOffline
}
