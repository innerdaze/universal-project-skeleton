import { createSelector } from 'reselect'
import createCachedSelector from 're-reselect'
import { productEntitiesSelector } from '~features/product/selectors'

export const lastError = state => state.barcode.barcodeLookup.lastError
export const barcodeEntitiesSelector = state => state.barcode.barcodeEntities

export const priceByBarcodeSelector = createCachedSelector(
  barcodeEntitiesSelector,
  productEntitiesSelector,
  (state, barcode) => barcode,
  (barcodeEntities, productEntities, barcode) => {
    const barcodeEntity = barcodeEntities[barcode]

    if (barcodeEntity) {
      if (barcodeEntity.SellingPrice) {
        return barcodeEntity.SellingPrice
      }

      const product = productEntities[barcodeEntity.ProductID]

      return product.SellingPrice
    }
  }
)((state, barcode) => barcode)

export default {
  lastError,
  barcodeEntitiesSelector,
  priceByBarcodeSelector
}
