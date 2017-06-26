import test from 'ava'
import { deleteOrder } from '../../../actions/OrderActions'
import { DELETE_ORDER } from '../../../constants/ActionTypes'

test('create an action to delete an order', t => {
  const id = 1

  const expectedAction = {
    type: DELETE_ORDER,
    id
  }

  t.deepEqual(deleteOrder(id), expectedAction)
})
