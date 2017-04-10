import test from 'ava'
import { requestProducts } from '../../../client/actions/ProductActions'
import { REQUEST_PRODUCTS } from '../../../client/constants/ActionTypes'

test('create an action to request all products', t => {
  const expectedAction = {
    type: REQUEST_PRODUCTS
  }

  t.deepEqual(requestProducts(), expectedAction)
})
