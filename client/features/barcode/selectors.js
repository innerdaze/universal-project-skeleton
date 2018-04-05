import { createSelector } from 'reselect'
import createCachedSelector from 're-reselect'
import { productEntitiesSelector } from '~features/product/selectors'

const lastError = state => state.barcode.barcodeLookup.lastError
const barcodeEntitiesSelector = state => state.barcode.barcodeEntities
const priceByBarcodeSelector = createCachedSelector(
  barcodeEntitiesSelector,
  productEntitiesSelector,
  barcode => barcode,
  (barcodeEntities, productEntities, barcode) => {
    const barcodeEntity = barcodeEntities[barcode]

    if (barcodeEntity) {
      if (barcodeEntity.SellingPrice) {
        return barcode.SellingPrice
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
