import thunkMiddleware from 'redux-thunk'
import { createStore, applyMiddleware, compose } from 'redux'
import { createLogger } from 'redux-logger'
import { composeWithDevTools } from 'redux-devtools-extension'
import { persistStore, autoRehydrate } from 'redux-persist'
import createFilter from 'redux-persist-transform-filter'
import localForage from 'localforage'
import cordovaSQLiteDriver from 'localforage-cordovasqlitedriver'
import appReducer from './reducers/RootReducer'

export default async function configureStore(initialState) {
  const loggerMiddleware = createLogger()

  let storeEnhancers;

  if (process.env.NODE_ENV === 'development') {
    storeEnhancers = composeWithDevTools(
      applyMiddleware(
        thunkMiddleware,
        loggerMiddleware
      ),
      autoRehydrate()
    )
  } else {
    storeEnhancers = compose(
      applyMiddleware(thunkMiddleware),
      autoRehydrate()
    )
  }

  const store = createStore(
    appReducer,
    storeEnhancers
  )

  if (module.hot) {
    module.hot.accept('./reducers', () => {
      const nextRootReducer = require('./reducers.js')
      store.replaceReducer(nextRootReducer)
    })
  }

  await localForage.defineDriver(cordovaSQLiteDriver)

  localForage.setDriver([
    localForage.INDEXEDDB,
    cordovaSQLiteDriver._driver
  ])

  persistStore(store, {
    storage: localForage,
    whitelist: [
      'orderEntities',
      'orders',
      'productEntities',
      'products',
      'cashierEntities',
      'cashiers',
      'barcodeEntities',
      'barcodes'
    ],
    transforms: [
      createFilter('orders', ['unprocessedItems', 'processedItems']),
      createFilter('products', ['items']),
      createFilter('cashiers', ['items']),
      createFilter('barcodes', ['items'])
    ]
  })

  return store
}
