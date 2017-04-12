import 'babel-polyfill' // eslint-disable-line import/no-unassigned-import
import 'grommet/scss/hpe/index.scss' // eslint-disable-line import/no-unassigned-import
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import configureStore from './store'
import Root from './containers/Root.jsx'


async function startApp() {

  const store = await configureStore()

  render(
    <Provider store={store}>
      <Root/>
    </Provider>,
    document.getElementById('root')
  )

  if (module.hot) {
    module.hot.accept()
  }
  // store.dispatch(push('/'))
}

if (window.cordova) {
  document.addEventListener('deviceready', startApp, false)
} else {
  startApp()
}
