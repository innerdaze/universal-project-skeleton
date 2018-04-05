import createCachedSelector from 're-reselect'
import { productEntitiesSelector } from '~features/product/selectors'

export const errorSelector = state => state.priceCheck.error
export const isGettingPriceSelector = state => state.priceCheck.isGettingPrice
export const isUpdatingPriceSelector = state => state.priceCheck.isUpdatingPrice
export const lastPriceCheckSelector = state => state.priceCheck.lastPriceCheck
export const currentContextSelector = state => state.priceCheck.currentContext
export const priceUpdateIntentSelector = state =>
  state.priceCheck.priceUpdateIntent
export const byIdSelector = state => state.priceCheck.byId

export const createPriceCheckModelForProductIdSelector = createCachedSelector(
  productEntitiesSelector,
  (state, productId) => productId,
  (productEntities, productId) => {
    const product = productEntities[productId]

    if (product) {
      return {
        CaseQty: 0,
        CostPrice: 0,
        Description: product.ProductName,
        Margin: 0,
        POSPrice: 0,
        SellingPrice: 0,
        SupplierName: '',
        SupplierPID: ''
      }
    }
  }
)((state, productId) => productId)

export default {
  errorSelector,
  isGettingPriceSelector,
  isUpdatingPriceSelector,
  lastPriceCheckSelector,
  currentContextSelector,
  priceUpdateIntentSelector,
  byIdSelector,
  createPriceCheckModelForProductIdSelector
}
