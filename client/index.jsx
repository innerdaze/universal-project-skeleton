import 'babel-polyfill' // eslint-disable-line import/no-unassigned-import
import 'grommet/scss/hpe/index.scss' // eslint-disable-line import/no-unassigned-import
import React from 'react'
import { render } from 'react-dom'
import { connect, push } from 'connected-react-router'
import configureStore from './store'
import AppProvider from './components/AppProvider'
import RootContainer from './containers/RootContainer'

async function startApp() {
  const store = await configureStore()

  render(
    <AppProvider store={store}>
      <RootContainer/>
    </AppProvider>,
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
