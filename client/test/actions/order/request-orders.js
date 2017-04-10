import test from 'ava'
import { requestOrders } from '../../../client/actions/OrderActions'
import { REQUEST_ORDERS } from '../../../client/constants/ActionTypes'

test.skip('create an action to request all orders', t => {
  const device = { id: 'unicorn' }

  const expectedAction = {
    type: REQUEST_ORDERS,
    device
  }

  t.deepEqual(requestOrders(device), expectedAction)
})
