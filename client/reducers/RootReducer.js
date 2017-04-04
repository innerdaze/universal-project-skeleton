import { combineReducers } from 'redux'
import { orders, orderEntities } from './OrdersReducer'

const appReducer = combineReducers({
  orders,
  orderEntities
})

export default appReducer
