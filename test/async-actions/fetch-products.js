import test from 'ava'
import nock from 'nock'
import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import _ from 'lodash'
import { apiURL } from '../../client/config'
import { fetchProducts } from '../../client/actions/ProductActions'
import appReducer from '../../client/reducers/RootReducer'

test('fetch products and populate the store', async t => {
  let store = createStore(
    appReducer,
    applyMiddleware(
      thunkMiddleware
    )
  )

  const device = { id: 'unicorn' }

  const responseBody = {
    version: '1.1',
    id: '{DCD95427-5EBE-44B0-82B9-CE5CF1677D9E}',
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
    .get('/products')
    .reply(200, responseBody)

  await store.dispatch(fetchProducts(device))

  const resultList = responseBody.result.Result.ListOfProducts

  t.deepEqual(store.getState().products.items, _.map(resultList, 'ProductID'))
  t.deepEqual(store.getState().productEntities, resultList)
})
