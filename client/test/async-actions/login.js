import test from 'ava'
import nock from 'nock'
import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import _ from 'lodash'
import { v4 as uuidGen } from 'uuid'
import { apiURL } from '../../config'
import { login } from '../../actions/SessionActions'
import appReducer from '../../reducers/RootReducer'

test('login to the remote server and retrieve a session ID', async t => {
  const store = createStore(
    appReducer,
    applyMiddleware(
      thunkMiddleware
    )
  )

  const sessionID = uuidGen()
  const userID = uuidGen()
  const userName = 'Peter'
  const password = 'secret'

  const responseBody = {
    result: {
      Result: {
        SessionID: sessionID,
        UserData: {
          UserID: userID,
          UserName: userName
        }
      }
    }
  }

  nock(apiURL)
    .post('/', {
      method: 'SystemLoginSrevice.Login',
      params: {
        UserID: userID,
        Password: password
      }
    })
    .reply(200, responseBody)

  await store.dispatch(login(userID, password))

  t.is(store.getState().user.id, userID)
  t.is(store.getState().user.name, userName)
  t.is(store.getState().session.id, sessionID)
  t.true(store.getState().session.alive)
  t.false(store.getState().session.isRequesting)
})
