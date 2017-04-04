import 'babel-polyfill' // eslint-disable-line import/no-unassigned-import
import React from 'react'
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import appReducer from './reducers/RootReducer'
import Root from './containers/Root.jsx'
import { fetchOrders } from './actions/OrderActions'

if (module.hot) {
  module.hot.accept()
}

const loggerMiddleware = createLogger()

function startApp() {
  let store = createStore(
    appReducer,
    applyMiddleware(
      thunkMiddleware,
      loggerMiddleware
    )
  )

  render(
    <Provider store={store}>
      <Root/>
    </Provider>,
    document.getElementById('root')
  )

  store.dispatch(fetchOrders({ id: 'whateva' }))
}

if (window.cordova) {
  document.addEventListener('deviceready', startApp, false)
} else {
  startApp()
}
