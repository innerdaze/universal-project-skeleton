import thunkMiddleware from 'redux-thunk'
import { createStore, applyMiddleware, compose, combineReducers } from 'redux'
import { createLogger } from 'redux-logger'
import { composeWithDevTools } from 'redux-devtools-extension'
import { persistStore, persistReducer } from 'redux-persist'
import localForage from 'localforage'
import { connectRouter, routerMiddleware } from 'connected-react-router'
import cordovaSQLiteDriver from 'localforage-cordovasqlitedriver'
import history from './history'
import * as reducers from './features'

// Persist Configs
const rootPersistConfig = storage => ({
  storage,
  key: 'root'
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

  // TODO - Make a withPersistence HOR

  const reducer = combineReducers(reducers)

  const store = createStore(
    persistReducer(
      rootPersistConfig(localForage),
      connectRouter(history)(reducer)
    ),
    initialState,
    storeEnhancers
  )

  if (module.hot) {
    module.hot.accept('./features/index', () => {
      store.replaceReducer(
        persistReducer(
          rootPersistConfig(localForage),
          connectRouter(history)(reducer)
        )
      )
    })
  }

  return { persister: persistStore(store), store }
}
