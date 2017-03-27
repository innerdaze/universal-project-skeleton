import React from 'react'
import ReactDOM from 'react-dom'

import MyRootAppComponent from './components/MyRootAppComponent.jsx'

if (module.hot) {
  module.hot.accept();
}

function startApp() {
  ReactDOM.render(
    <MyRootAppComponent />
    , document.getElementById('root'))
}

if (window.cordova) {
  document.addEventListener('deviceready', startApp, false)
} else {
  startApp()
}
