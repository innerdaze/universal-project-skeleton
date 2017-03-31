import test from 'ava'
import {createStore} from 'redux'
import {addOrder} from '../client/actions/OrderActions'
import orderApp from '../client/reducers/AppReducer'

test('add order', t => {
  let store = createStore(orderApp)

  const order = {
    id: 99,
    productId: '1234567890',
    title: 'Test Product',
    quantity: 5
  }

  let unsubscribe = store.subscribe(() => {
    if (store.getState().orders[0] === order) {
      t.pass()
    }
  })

  store.dispatch(addOrder(order))

  unsubscribe()
})
