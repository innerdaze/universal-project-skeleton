import test from 'ava'
import nock from 'nock'
import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import _ from 'lodash'
import { apiURL } from '../../client/config'
import { fetchOrders } from '../../client/actions/OrderActions'
import appReducer from '../../client/reducers/RootReducer'

test('fetch orders and populate the store', async t => {
  let store = createStore(
    appReducer,
    applyMiddleware(
      thunkMiddleware
    )
  )

  const device = { id: 'unicorn' }

  const responseBody = [{
    id: 1,
    productId: 'ABCDEFGHIJK',
    quantity: 5,
    title: 'Test Product'
  }]

  nock(apiURL)
    .get('/orders')
    .reply(200, responseBody)

  await store.dispatch(fetchOrders(device))

  t.deepEqual(store.getState().orders.items, _.map(responseBody, 'id'))
  t.deepEqual(store.getState().orderEntities, responseBody)
})
