import test from 'ava'
import { receiveLogin } from '../../../actions/SessionActions'
import { RECEIVE_LOGIN } from '../../../constants/ActionTypes'

test('create an action to request login', t => {
  const actualAction = receiveLogin()

  t.is(actualAction.type, RECEIVE_LOGIN)
  t.is(typeof actualAction.receivedAt, 'number')
})
