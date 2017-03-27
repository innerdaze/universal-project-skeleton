import React from 'react'
import ReactDOM from 'react-dom'

import MyRootAppComponent from './components/MyRootAppComponent.jsx'

if (module.hot) {
  module.hot.accept();
}

ReactDOM.render(
  <MyRootAppComponent />
  , document.getElementById('root'))
