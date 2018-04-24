import { createSelector } from 'reselect'

const isOffline = state => state.network.isOffline
export default {
  isOffline
}
