import test from 'ava'
import { requestCashiers } from '../../../actions/CashierActions'
import { REQUEST_CASHIERS } from '../../../constants/ActionTypes'

test('create an action to request all cashiers', t => {
  const expectedAction = {
    type: REQUEST_CASHIERS
  }

  t.deepEqual(requestCashiers(), expectedAction)
})
