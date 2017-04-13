import { orders, orderEntities } from './reducers/OrdersReducer'
import { products, productEntities } from './reducers/ProductsReducer'
import { cashiers, cashierEntities } from './reducers/CashiersReducer'
import { barcodes, barcodeEntities } from './reducers/BarcodesReducer'
import { session, user } from './reducers/SessionReducer'
import sync from './reducers/SyncReducer'
import scanner from './reducers/ScannerReducer'

export {
  orders,
  orderEntities,
  products,
  productEntities,
  cashiers,
  cashierEntities,
  barcodes,
  barcodeEntities,
  session,
  user,
  scanner,
  sync
}
