import React from 'react'
import {render} from 'react-dom'
import {Provider} from 'react-redux'
import {createStore} from 'redux'
import orderApp from './reducers/AppReducer'
import Root from './containers/Root.jsx'

if (module.hot) {
  module.hot.accept()
}

function startApp() {
  let store = createStore(orderApp)

  render(
    <Provider store={store}>
      <Root/>
    </Provider>,
    document.getElementById('root')
  )
}

if (window.cordova) {
  document.addEventListener('deviceready', startApp, false)
} else {
  startApp()
}
