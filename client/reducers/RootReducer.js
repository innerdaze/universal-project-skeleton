import { combineReducers } from 'redux'
import { orders, orderEntities } from './OrdersReducer'
import { products, productEntities } from './ProductsReducer'

const appReducer = combineReducers({
  orders,
  orderEntities,
  products,
  productEntities
})

export default appReducer
