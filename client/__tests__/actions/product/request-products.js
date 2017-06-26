import test from 'ava'
import { requestProducts } from '../../../actions/ProductActions'
import { REQUEST_PRODUCTS } from '../../../constants/ActionTypes'

test('create an action to request all products', t => {
  const expectedAction = {
    type: REQUEST_PRODUCTS
  }

  t.deepEqual(requestProducts(), expectedAction)
})
