import { createSelector } from 'reselect'

const lastMatches = state => state.product.productSearch.lastMatches
const productEntitiesSelector = state => state.product.productEntities

export default {
  lastMatches,
  productEntitiesSelector
}
