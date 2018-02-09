import { createSelector } from 'reselect'

// const isInitialized = state => state.app.isInitialized
const isLoggedIn = state => state.session.session.alive
const apiRootValidationError = state => state.session.session.error
const id = state => state.session.id
export default {
  isLoggedIn,
  apiRootValidationError,
  id
}
