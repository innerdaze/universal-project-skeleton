import test from 'ava'
import { invalidateProducts } from '../../client/actions/ProductActions'
import { INVALIDATE_PRODUCTS } from '../../client/constants/ActionTypes'

test('create an action to invalidate an product', t => {
  const device = { id: 'unicorn' }

  const expectedAction = {
    type: INVALIDATE_PRODUCTS,
    device
  }

  t.deepEqual(invalidateProducts(device), expectedAction)
})
