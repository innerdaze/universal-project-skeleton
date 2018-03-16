export const errorSelector = state => state.priceCheck.error
export const isGettingPriceSelector = state => state.priceCheck.isGettingPrice
export const isUpdatingPriceSelector = state => state.priceCheck.isUpdatingPrice
export const lastPriceCheckSelector = state => state.priceCheck.lastPriceCheck
export const currentContextSelector = state => state.priceCheck.currentContext
export const priceUpdateIntentSelector = state =>
  state.priceCheck.priceUpdateIntent

export default {
  errorSelector,
  isGettingPriceSelector,
  isUpdatingPriceSelector,
  lastPriceCheckSelector,
  currentContextSelector,
  priceUpdateIntentSelector
}
