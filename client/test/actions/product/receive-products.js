import test from 'ava'
import { receiveProducts } from '../../../client/actions/ProductActions'
import { RECEIVE_PRODUCTS } from '../../../client/constants/ActionTypes'

test('create an action to receive all products', t => {
  const actualAction = receiveProducts()

  t.is(actualAction.type, RECEIVE_PRODUCTS)
  t.is(actualAction.products, undefined)
  t.is(typeof actualAction.receivedAt, 'number')
})
