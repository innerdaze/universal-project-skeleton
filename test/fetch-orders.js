import test from 'ava'
import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { fetchOrders } from '../client/actions/OrderActions'
import appReducer from '../client/reducers/RootReducer'

test.cb('fetch orders', t => {
  let store = createStore(
    appReducer,
    applyMiddleware(
      thunkMiddleware
    )
  )

  let unsubscribe = store.subscribe(() => {
    const orders = store.getState().orders.items
    debugger;
    t.is(orders.length, 3)
    t.end()
  })

  store.dispatch(fetchOrders({ id: 'whateva' }))

  unsubscribe()
})
