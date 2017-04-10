import test from 'ava'
import { invalidateCashiers } from '../../../client/actions/CashierActions'
import { INVALIDATE_CASHIERS } from '../../../client/constants/ActionTypes'

test('create an action to invalidate all cashiers', t => {
  const expectedAction = {
    type: INVALIDATE_CASHIERS
  }

  t.deepEqual(invalidateCashiers(), expectedAction)
})
