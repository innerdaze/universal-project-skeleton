import test from 'ava'
import { requestProducts } from '../../client/actions/ProductActions'
import { REQUEST_PRODUCTS } from '../../client/constants/ActionTypes'

test('create an action to request all products', t => {
  const device = { id: 'unicorn' }

  const expectedAction = {
    type: REQUEST_PRODUCTS,
    device
  }

  t.deepEqual(requestProducts(device), expectedAction)
})
