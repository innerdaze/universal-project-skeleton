import test from 'ava'
import { requestLogout } from '../../../client/actions/SessionActions'
import { REQUEST_LOGOUT } from '../../../client/constants/ActionTypes'

test('create an action to start a session', t => {
  const expectedAction = {
    type: REQUEST_LOGOUT
  }

  t.deepEqual(requestLogout(), expectedAction)
})
