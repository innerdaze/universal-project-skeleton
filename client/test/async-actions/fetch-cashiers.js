import test from 'ava'
import nock from 'nock'
import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { map, keyBy } from 'lodash'
import { v4 as uuidGen } from 'uuid'
import { apiURL } from '../../config'
import { fetchCashiers } from '../../actions/CashierActions'
import appReducer from '../../reducers/RootReducer'

test('fetch cashiers and populate the store', async t => {
  let store = createStore(
    appReducer,
    applyMiddleware(
      thunkMiddleware
    )
  )

  const sessionID = uuidGen()

  const responseBody = {
    result: {
      Result: {
        __type: 'ResultGetCashiers',
        ListOfCashiers: [{
          CashierID: 'S-D10420'
        }, {
          CashierID: 'S-D11309'
        }]
      }
    }
  }

  nock(apiURL)
    .post('/', {
      method: 'CashierService.GetCashiers',
      params: {
        SessionID: sessionID,
        StoreID: 0
      }
    })
    .reply(200, responseBody)

  await store.dispatch(fetchCashiers(sessionID))

  const resultList = responseBody.result.Result.ListOfCashiers

  t.deepEqual(store.getState().cashiers.items, map(resultList, 'CashierID'))
  t.deepEqual(store.getState().cashierEntities, keyBy(resultList, 'CashierID'))
})
