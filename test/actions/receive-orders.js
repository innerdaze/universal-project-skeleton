import test from 'ava'
import { receiveOrders } from '../../client/actions/OrderActions'
import { RECEIVE_ORDERS } from '../../client/constants/ActionTypes'

test('create an action to receive all orders', t => {
  const device = { id: 'unicorn' }
  const actualAction = receiveOrders(device)

  t.is(actualAction.type, RECEIVE_ORDERS)
  t.is(actualAction.orders, undefined)
  t.is(actualAction.device, device)
  t.is(typeof actualAction.receivedAt, 'number')
})
