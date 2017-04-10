import test from 'ava'
import { endSession } from '../../../client/actions/SessionActions'
import { END_SESSION } from '../../../client/constants/ActionTypes'

test('create an action to start a session', t => {
  const expectedAction = {
    type: END_SESSION
  }

  t.deepEqual(endSession(), expectedAction)
})
