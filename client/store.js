import thunkMiddleware from 'redux-thunk'
import { createStore, applyMiddleware, compose } from 'redux'
import { createLogger } from 'redux-logger'
import { composeWithDevTools } from 'redux-devtools-extension'
import { persistStore, autoRehydrate } from 'redux-persist'
import createFilter from 'redux-persist-transform-filter'
import localForage from 'localforage'
import { connectRouter, routerMiddleware } from 'connected-react-router'
import cordovaSQLiteDriver from 'localforage-cordovasqlitedriver'
import rootReducer from './reducers/RootReducer'
import history from './history'


export default async function configureStore(initialState) {
  const loggerMiddleware = createLogger()

  let storeEnhancers

  if (process.env.NODE_ENV === 'development') {
    storeEnhancers = composeWithDevTools(
      applyMiddleware(
        routerMiddleware(history),
        thunkMiddleware,
        loggerMiddleware
      ),
      autoRehydrate()
    )
  } else {
    storeEnhancers = compose(
      applyMiddleware(
        routerMiddleware(history),
        thunkMiddleware
      ),
      autoRehydrate()
    )
  }

  const store = createStore(
    connectRouter(history)(rootReducer),
    storeEnhancers
  )

  if (module.hot) {
    module.hot.accept('./reducers', () => {
      store.replaceReducer(connectRouter(history)(rootReducer))
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
      'barcodes',
      'app',
      'session'
    ],
    transforms: [
      createFilter('orders', ['unprocessedItems', 'processedItems']),
      createFilter('products', ['items']),
      createFilter('cashiers', ['items']),
      createFilter('barcodes', ['items'])
      // createFilter('app', ['initialized', 'apiRoot'])
    ]
  })

  return store
}
