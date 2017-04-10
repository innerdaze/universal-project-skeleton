import test from 'ava'
import { invalidateOrders } from '../../../client/actions/OrderActions'
import { INVALIDATE_ORDERS } from '../../../client/constants/ActionTypes'

test.skip('create an action to invalidate an order', t => {
  const device = { id: 'unicorn' }

  const expectedAction = {
    type: INVALIDATE_ORDERS,
    device
  }

  t.deepEqual(invalidateOrders(device), expectedAction)
})
