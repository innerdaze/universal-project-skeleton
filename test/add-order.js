import test from 'ava'
import { createStore } from 'redux'
import { addOrder } from '../client/actions/OrderActions'
import orderApp from '../client/reducers/RootReducer'

test('add order', t => {
  let store = createStore(orderApp)

  const order = {
    id: 99,
    productId: '1234567890',
    title: 'Test Product',
    quantity: 5
  }

  let unsubscribe = store.subscribe(() => {
    const orders = store.getState().orderEntities
    const ids = Object.keys(orders)

    for (let i = 0, ln = ids.length, current; i < ln; i++) {
      current = ids[i]
      if (current === order.id && orders[current] === order) {
        t.pass()
      }
    }
  })

  store.dispatch(addOrder(order))

  unsubscribe()
})
