import thunkMiddleware from 'redux-thunk'
import { createStore, applyMiddleware } from 'redux'
import { createLogger } from 'redux-logger'
import { composeWithDevTools } from 'redux-devtools-extension'
import appReducer from './reducers/RootReducer'

export default function configureStore(initialState) {
  const loggerMiddleware = createLogger()

  const store = createStore(
    appReducer,
    composeWithDevTools(
      applyMiddleware(
        thunkMiddleware,
        loggerMiddleware
      )
    )
  )

  if (module.hot) {
    module.hot.accept('./reducers', () => {
      const nextRootReducer = require('./reducers/RootReducer')
      store.replaceReducer(nextRootReducer)
    })
  }

  return store
}
