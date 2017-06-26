import test from 'ava'
import nock from 'nock'
import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import _ from 'lodash'
import { v4 as uuidGen } from 'uuid'
import { apiURL } from '../../config'
import { fetchBarcodes } from '../../actions/BarcodeActions'
import appReducer from '../../reducers/RootReducer'

test('fetch barcodes and populate the store', async t => {
  const store = createStore(
    appReducer,
    applyMiddleware(
      thunkMiddleware
    )
  )

  const sessionID = uuidGen()

  const responseBody = {
    result: {
      Result: {
        __type: 'ResultHandheldGetBarcode',
        ListOfBarcodes: [{
          Barcode: 'S-D10420'
        }, {
          Barcode: 'S-D11309'
        }]
      }
    }
  }

  nock(apiURL)
    .post('/', {
      method: 'HandheldService.GetBarcodes',
      params: {
        SessionID: sessionID,
        GetOptions: 0
      }
    })
    .reply(200, responseBody)

  await store.dispatch(fetchBarcodes(sessionID))

  const resultList = responseBody.result.Result.ListOfBarcodes

  t.deepEqual(store.getState().barcodes.items, _.map(resultList, 'Barcode'))
  t.deepEqual(store.getState().barcodeEntities, _.keyBy(resultList, 'Barcode'))
})
