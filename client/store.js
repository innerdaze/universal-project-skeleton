import thunkMiddleware from 'redux-thunk'
import { createStore, applyMiddleware, compose, combineReducers } from 'redux'
import { createLogger } from 'redux-logger'
import { composeWithDevTools } from 'redux-devtools-extension'
import { persistStore, persistReducer } from 'redux-persist'
import { createFilter } from 'redux-persist-transform-filter'
import localForage from 'localforage'
import { connectRouter, routerMiddleware } from 'connected-react-router'
import cordovaSQLiteDriver from 'localforage-cordovasqlitedriver'
import history from './history'
import * as reducers from './ducks'

// Persist Configs
const rootPersistConfig = storage => ({
  storage,
  key: 'root',
  whitelist: ['app', 'session', 'order', 'product', 'cashier', 'barcode']
})

const appPersistConfig = storage => ({
  storage,
  key: 'app',
  whitelist: ['apiRoot', 'isInitialized', 'storeID']
})

const sessionPersistConfig = storage => ({
  storage,
  key: 'session'
})

const orderPersistConfig = storage => ({
  storage,
  key: 'order',
  whitelist: ['orders', 'orderEntities'],
  transforms: [
    createFilter('orders', ['unprocessedItems', 'processedItems', 'mode'])
  ]
})

const productPersistConfig = storage => ({
  storage,
  key: 'product',
  whitelist: ['products', 'productIDsByProductName', 'productEntities'],
  transforms: [createFilter('products', ['items'])]
})

const cashierPersistConfig = storage => ({
  storage,
  key: 'cashier',
  whitelist: ['cashiers', 'cashierEntities'],
  transforms: [
    createFilter('cashiers', ['items', 'idByUsername', 'activeCashier'])
  ]
})

const barcodePersistConfig = storage => ({
  storage,
  key: 'barcode',
  whitelist: ['barcodes', 'barcodeEntities', 'barcodeIDsByProductID'],
  transforms: [createFilter('barcodes', ['items'])]
})

export default async function configureStore(initialState) {
  const loggerMiddleware = createLogger()

  let storeEnhancers

  if (process.env.NODE_ENV === 'development') {
    storeEnhancers = composeWithDevTools(
      applyMiddleware(
        routerMiddleware(history),
        thunkMiddleware,
        loggerMiddleware
      )
    )
  } else {
    storeEnhancers = compose(
      applyMiddleware(routerMiddleware(history), thunkMiddleware)
    )
  }

  await localForage.defineDriver(cordovaSQLiteDriver)

  localForage.setDriver([localForage.INDEXEDDB, cordovaSQLiteDriver._driver])

  const reducer = combineReducers({
    ...reducers,
    app: persistReducer(appPersistConfig(localForage), reducers.app),
    session: persistReducer(
      sessionPersistConfig(localForage),
      reducers.session
    ),
    order: persistReducer(orderPersistConfig(localForage), reducers.order),
    product: persistReducer(
      productPersistConfig(localForage),
      reducers.product
    ),
    cashier: persistReducer(
      cashierPersistConfig(localForage),
      reducers.cashier
    ),
    barcode: persistReducer(barcodePersistConfig(localForage), reducers.barcode)
  })

  const store = createStore(
    persistReducer(
      rootPersistConfig(localForage),
      connectRouter(history)(reducer)
    ),
    initialState,
    storeEnhancers
  )

  const persistor = persistStore(store)

  if (module.hot) {
    module.hot.accept('./ducks/index', () => {
      store.replaceReducer(
        persistReducer(
          rootPersistConfig(localForage),
          connectRouter(history)(reducer)
        )
      )
    })
  }

  return { persistor, store }
}
