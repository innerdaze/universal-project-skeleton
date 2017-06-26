import test from 'ava'
import { endSession } from '../../../actions/SessionActions'
import { END_SESSION } from '../../../constants/ActionTypes'

test('create an action to start a session', t => {
  const expectedAction = {
    type: END_SESSION
  }

  t.deepEqual(endSession(), expectedAction)
})
