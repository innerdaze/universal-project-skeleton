import test from 'ava'
import nock from 'nock'
import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { map, keyBy } from 'lodash'
import { v4 as uuidGen } from 'uuid'
import { apiURL } from '../../config'
import { fetchProducts } from '../../actions/ProductActions'
import appReducer from '../../reducers/RootReducer'

test('fetch products and populate the store', async t => {
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
        __type: 'ResultHandheldGetProducts',
        ListOfProducts: [{
          ProductID: 'S-D10420'
        }, {
          ProductID: 'S-D11309'
        }]
      }
    }
  }

  nock(apiURL)
    .post('/', {
      method: 'HandheldService.GetProducts',
      params: {
        SessionID: sessionID,
        GetOptions: 0
      }
    })
    .reply(200, responseBody)

  await store.dispatch(fetchProducts(sessionID))

  const resultList = responseBody.result.Result.ListOfProducts

  t.deepEqual(store.getState().products.items, map(resultList, 'ProductID'))
  t.deepEqual(store.getState().productEntities, keyBy(resultList, 'ProductID'))
})
