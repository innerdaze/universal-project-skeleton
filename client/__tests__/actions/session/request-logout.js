import test from 'ava'
import { requestLogout } from '../../../actions/SessionActions'
import { REQUEST_LOGOUT } from '../../../constants/ActionTypes'

test('create an action to start a session', t => {
  const expectedAction = {
    type: REQUEST_LOGOUT
  }

  t.deepEqual(requestLogout(), expectedAction)
})
