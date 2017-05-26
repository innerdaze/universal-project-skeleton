import { orders, orderEntities } from './reducers/OrdersReducer'
import { products, productEntities, productIDsByProductName } from './reducers/ProductsReducer'
import { cashiers, cashierEntities } from './reducers/CashiersReducer'
import { barcodes, barcodeEntities } from './reducers/BarcodesReducer'
import app from './reducers/AppReducer'
import barcodeLookup from './reducers/BarcodeLookupReducer'
import { session, user } from './reducers/SessionReducer'
import sync from './reducers/SyncReducer'
import scanner from './reducers/ScannerReducer'
import ui from './reducers/UIReducer'
import error from './reducers/ErrorReducer'
import validation from './reducers/ValidationReducer'

export {
  orders,
  orderEntities,
  products,
  productEntities,
  productIDsByProductName,
  cashiers,
  cashierEntities,
  barcodes,
  barcodeEntities,
  barcodeLookup,
  session,
  user,
  scanner,
  sync,
  ui,
  app,
  error,
  validation
}
