import test from 'ava'
import { receiveCashiers } from '../../../client/actions/CashierActions'
import { RECEIVE_CASHIERS } from '../../../client/constants/ActionTypes'

test('create an action to receive all cashiers', t => {
  const actualAction = receiveCashiers()

  t.is(actualAction.type, RECEIVE_CASHIERS)
  t.is(actualAction.cashiers, undefined)
  t.is(typeof actualAction.receivedAt, 'number')
})
