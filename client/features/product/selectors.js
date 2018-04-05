import { createSelector } from 'reselect'
import createCachedSelector from 're-reselect'

export const lastMatches = state => state.product.productSearch.lastMatches
export const productEntitiesSelector = state => state.product.productEntities

export const priceByProductIdSelector = createCachedSelector(
  productEntitiesSelector,
  (state, productId) => productId,
  (productEntities, productId) => {
    const product = productEntities[productId]

    if (product) {
      return product.SellingPrice
    }
  }
)((state, productId) => productId)

export default {
  lastMatches,
  productEntitiesSelector,
  priceByProductIdSelector
}
