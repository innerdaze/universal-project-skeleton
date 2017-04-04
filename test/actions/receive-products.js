import test from 'ava'
import { receiveProducts } from '../../client/actions/ProductActions'
import { RECEIVE_PRODUCTS } from '../../client/constants/ActionTypes'

test('create an action to receive all products', t => {
  const device = { id: 'unicorn' }
  const actualAction = receiveProducts(device)

  t.is(actualAction.type, RECEIVE_PRODUCTS)
  t.is(actualAction.products, undefined)
  t.is(actualAction.device, device)
  t.is(typeof actualAction.receivedAt, 'number')
})
