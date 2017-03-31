import {combineReducers} from 'redux'
import orders from './OrdersReducer'

const appReducer = combineReducers({
  orders
})

export default appReducer
