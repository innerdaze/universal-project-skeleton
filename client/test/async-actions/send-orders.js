import test from 'ava'
import nock from 'nock'
import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import _ from 'lodash'
import { v4 as uuidGen } from 'uuid'
import { apiURL } from '../../config'
import { sendOrders } from '../../actions/OrderActions'
import appReducer from '../../reducers/RootReducer'

test.failing('send orders to server for processing', async t => {
  let store = createStore(
    appReducer,
    applyMiddleware(
      thunkMiddleware
    )
  )

  const device = { id: 'unicorn' }
  const sessionID = uuidGen()

  const responseBody = [{
    result: {
      Result: {
        ResCode: 0
      }
    }
  }]

  nock(apiURL)
    .post('/', {
      method: 'HandheldService.ProcessTransactions',
      params: {
        SessionID: sessionID,
        Data: [{
          __type: 'HandheldTrans',
          AreaID: '',
          Barcode: '1234',
          Qty: 100,
          Ref1: '',
          Ref2: '',
          TermianlID: '1',
          TransDate: '2017-03-31T19:54:40.765',
          TransType: 10,
          UnitID: '',
          UserID: '1234'
        }]
      }
    })
    .reply(200, responseBody)

  await store.dispatch(sendOrders(device))

  t.deepEqual(store.getState().orders.items, _.map(responseBody, 'id'))
  t.deepEqual(store.getState().orderEntities, responseBody)
})
