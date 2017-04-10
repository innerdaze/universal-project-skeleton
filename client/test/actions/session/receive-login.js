import test from 'ava'
import { receiveLogin } from '../../../client/actions/SessionActions'
import { RECEIVE_LOGIN } from '../../../client/constants/ActionTypes'

test('create an action to request login', t => {
  const actualAction = receiveLogin()

  t.is(actualAction.type, RECEIVE_LOGIN)
  t.is(typeof actualAction.receivedAt, 'number')
})
