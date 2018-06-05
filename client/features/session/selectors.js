import { createSelector } from 'reselect'

// const isInitialized = state => state.app.isInitialized
export const isLoggedIn = state => state.session.session.alive
export const apiRootValidationError = state => state.session.session.error
export const id = state => state.session.id
export const requiresDomainSelector = state =>
  state.session.session.requiresDomain
export const domainSelector = state => state.session.session.domain

export default {
  isLoggedIn,
  apiRootValidationError,
  id,
  requiresDomainSelector,
  domainSelector
}
