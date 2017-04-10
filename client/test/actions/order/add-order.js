import test from 'ava'
import { addOrder } from '../../../client/actions/OrderActions'
import { ADD_ORDER } from '../../../client/constants/ActionTypes'

test('create an action to add an order', t => {
  const id = 1
  const order = {
    id: id,
    productId: 'ABCDEFGHIJK',
    quantity: 5,
    title: 'Test Product'
  }

  const expectedAction = {
    type: ADD_ORDER,
    id,
    order
  }

  t.deepEqual(addOrder(id, order), expectedAction)
})
