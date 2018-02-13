import 'babel-polyfill' // eslint-disable-line import/no-unassigned-import
import 'grommet/scss/hpe/index.scss' // eslint-disable-line import/no-unassigned-import
import React from 'react'
import { render } from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import StackTrace from 'stacktrace-js'
import { logError } from './helpers/reporting'
import configureStore from './store'
import Root from './components/Root'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/es/integration/react'
import RootContainer from './containers/RootContainer'

function renderWithHotReload(RootElement, persistor, store) {
  render(
    <AppContainer>
      <Provider store={store}>
        <PersistGate loading={<div>Loading...</div>} persistor={persistor}>
          <RootElement history={history} />
        </PersistGate>
      </Provider>
    </AppContainer>,
    document.getElementById('root')
  )
}

async function startApp() {
  try {
    const { persistor, store } = await configureStore()

    renderWithHotReload(RootContainer, persistor, store)

    if (module.hot) {
      module.hot.accept('./containers/RootContainer', () => {
        renderWithHotReload(
          require('./containers/RootContainer').default,
          persistor,
          store
        )
      })
    }
  } catch (e) {
    StackTrace.fromError(e).then(stack => logError(e, stack))
  }
}

if (window.cordova) {
  document.addEventListener('deviceready', startApp, false)
} else {
  startApp()
}
