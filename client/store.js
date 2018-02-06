import thunkMiddleware from 'redux-thunk'
import { createStore, applyMiddleware, compose } from 'redux'
import { createLogger } from 'redux-logger'
import { composeWithDevTools } from 'redux-devtools-extension'
import { persistStore, persistCombineReducers } from 'redux-persist'
import localForage from 'localforage'
import { connectRouter, routerMiddleware } from 'connected-react-router'
import cordovaSQLiteDriver from 'localforage-cordovasqlitedriver'
import history from './history'
import * as reducers from './ducks'
import App from './components/App'
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

  const reducer = persistCombineReducers(
    {
      key: 'root',
      storage: localForage
    },
    reducers
  )

  const store = createStore(
    connectRouter(history)(reducer),
    initialState,
    storeEnhancers
  )

  const persistor = persistStore(store)

  if (module.hot) {
    module.hot.accept('./ducks/index', () => {
      store.replaceReducer(connectRouter(history)(reducer))
    })

    module.hot.accept('./helpers/ducks', () => {
       renderWithHotReload(require('./components/AppWrapper').default, persistor, store)
    })
  }

  return {persistor,store} 
}