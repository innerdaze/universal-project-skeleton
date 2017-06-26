import test from 'ava'
import { receiveCashiers } from '../../../actions/CashierActions'
import { RECEIVE_CASHIERS } from '../../../constants/ActionTypes'

test('create an action to receive all cashiers', t => {
  const actualAction = receiveCashiers()

  t.is(actualAction.type, RECEIVE_CASHIERS)
  t.is(actualAction.cashiers, undefined)
  t.is(typeof actualAction.receivedAt, 'number')
})
