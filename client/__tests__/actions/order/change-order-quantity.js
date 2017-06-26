import test from 'ava'
import { changeOrderQuantity } from '../../../actions/OrderActions'
import { CHANGE_ORDER_QUANTITY } from '../../../constants/ActionTypes'

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
