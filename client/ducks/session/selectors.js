import { createSelector } from 'reselect'

// const isInitialized = state => state.app.isInitialized
const isLoggedIn= state=> state.session.alive
const apiRootValidationError= state=> state.session.error
export default {
  isLoggedIn,
  apiRootValidationError
  }