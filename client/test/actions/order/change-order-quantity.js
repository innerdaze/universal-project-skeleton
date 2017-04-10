import test from 'ava'
import { changeOrderQuantity } from '../../../client/actions/OrderActions'
import { CHANGE_ORDER_QUANTITY } from '../../../client/constants/ActionTypes'

test('create an action to change an order quantity', t => {
  const id = 1
  const quantity = 5

  const expectedAction = {
    type: CHANGE_ORDER_QUANTITY,
    id,
    quantity
  }

  t.deepEqual(changeOrderQuantity(id, quantity), expectedAction)
})
