import { createSelector } from 'reselect'
import createCachedSelector from 're-reselect'
import { map, reverse } from 'ramda'
import { orderSelectors } from '../order'
import { productSelectors } from '../product'
import { barcodeSelectors } from '../barcode'

const {
  pendingOrdersBySelectedModeSelector,
  modeSelector,
  orderEntitiesSelector,
  changingOrderQuantityForSelector
} = orderSelectors
const { productEntitiesSelector } = productSelectors
const { barcodeEntitiesSelector } = barcodeSelectors

const productMappingError = 'Error mapping barcode to product'

/**
 * Returns a {@link Product} that relates to the given barcode.
 * If no {@link Barcode} is found for the given barcode, or the barcode does
 * not match a product, the return value is undefined.
 *
 * @param {String} barcode. The barcode ID to find a product for
 * @type {Product}
 */
export const productByBarcodeSelector = createCachedSelector(
  productEntitiesSelector,
  barcodeEntitiesSelector,
  (state, barcode) => barcode,
  (productEntities, barcodeEntities, barcode) => {
    const barcodeEntity = barcodeEntities[barcode]
    return barcodeEntity && productEntities[barcodeEntity.ProductID]
  }
)((state, barcode) => barcode)

/**
 * [pendingOrdersBySelectedModeWithProductsSelector description]
 * @type {[type]}
 */
const pendingOrdersBySelectedModeWithProductsSelector = createSelector(
  [
    pendingOrdersBySelectedModeSelector,
    productEntitiesSelector,
    barcodeEntitiesSelector
  ],
  (orderEntities, productEntities, barcodeEntities) =>
    map(order => {
      if (order.ProductID) {
        order.product = productEntities[order.ProductID]
      }

      if (!order.product && order.Barcode) {
        const barcodeEntity = barcodeEntities[order.Barcode]
        barcodeEntity &&
          (order.product = productEntities[barcodeEntity.ProductID])
      }

      if (!order.product) {
        order.product = { ProductName: productMappingError }
      }

      return order
    }, orderEntities)
)

/**
 * [pendingOrdersBySelectedModeWithProductsReversedSelector description]
 * @type {[type]}
 */
const pendingOrdersBySelectedModeWithProductsReversedSelector = createSelector(
  pendingOrdersBySelectedModeWithProductsSelector,
  reverse
)

const currentlyChangeQuantityForWithProductSelector = createSelector(
  changingOrderQuantityForSelector,
  productEntitiesSelector,
  barcodeEntitiesSelector,
  (order, productEntities, barcodeEntities) => {
    if (order.ProductID) {
      order.product = productEntities[order.ProductID]
    }

    if (!order.product && order.Barcode) {
      const barcodeEntity = barcodeEntities[order.Barcode]
      barcodeEntity &&
        (order.product = productEntities[barcodeEntity.ProductID])
    }

    if (!order.product) {
      order.product = { ProductName: productMappingError }
    }

    return order
  }
)

export default {
  pendingOrdersBySelectedModeWithProductsSelector,
  pendingOrdersBySelectedModeWithProductsReversedSelector,
  currentlyChangeQuantityForWithProductSelector
}
