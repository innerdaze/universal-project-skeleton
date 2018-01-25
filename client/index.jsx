import 'babel-polyfill' // eslint-disable-line import/no-unassigned-import
import 'grommet/scss/hpe/index.scss' // eslint-disable-line import/no-unassigned-import
import React from 'react'
import { render } from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import StackTrace from 'stacktrace-js'
import configureStore from './store'
import AppProvider from './components/AppProvider'
import RootContainer from './containers/RootContainer'

function renderWithHotReload(RootElement, store) {
  render(
    <AppContainer>
      <AppProvider store={store}>
        <RootContainer/>
      </AppProvider>
    </AppContainer>,
    document.getElementById('root')
  )
}

async function startApp() {
  try {
    const store = await configureStore()

    renderWithHotReload(RootContainer, store)

    if (module.hot) {
      module.hot.accept('./containers/RootContainer', () => {
        const NextRootContainer = require('./containers/RootContainer').default
        renderWithHotReload(<NextRootContainer/>, store)
      })
    }
  } catch (e) {
    StackTrace.fromError(e)
      .then(stack => {
        window.fabric.Crashlytics.sendNonFatalCrash(e.message, stack)
        window.fabric.Crashlytics.sendCrash()
      })
  }
}

if (window.cordova) {
  document.addEventListener('deviceready', startApp, false)
} else {
  startApp()
}
