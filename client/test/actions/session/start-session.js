import test from 'ava'
import { v4 as uuidGen } from 'uuid'
import { startSession } from '../../../client/actions/SessionActions'
import { START_SESSION } from '../../../client/constants/ActionTypes'

test('create an action to start a session', t => {
  const id = uuidGen()

  const expectedAction = {
    type: START_SESSION,
    id
  }

  t.deepEqual(startSession(id), expectedAction)
})
