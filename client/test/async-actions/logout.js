import test from 'ava'
import nock from 'nock'
import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import _ from 'lodash'
import { v4 as uuidGen } from 'uuid'
import { apiURL } from '../../config'
import { logout } from '../../actions/SessionActions'
import appReducer from '../../reducers/RootReducer'

test('logout from the remote server and nuke the local session data', async t => {
  let store = createStore(
    appReducer,
    applyMiddleware(
      thunkMiddleware
    )
  )

  const sessionID = uuidGen()

  nock(apiURL)
    .post('/', {
      method: 'SystemLoginService.Logout',
      params: {
        SessionID: sessionID
      }
    })
    .reply(200, {})

  await store.dispatch(logout(sessionID))

  t.is(store.getState().user.id, null)
  t.is(store.getState().user.name, null)
  t.is(store.getState().session.id, null)
  t.false(store.getState().session.alive)
  t.false(store.getState().session.isRequesting)
})
