import test from 'ava'
import { requestLogin } from '../../../client/actions/SessionActions'
import { REQUEST_LOGIN } from '../../../client/constants/ActionTypes'

test('create an action to start a session', t => {
  const expectedAction = {
    type: REQUEST_LOGIN
  }

  t.deepEqual(requestLogin(), expectedAction)
})
