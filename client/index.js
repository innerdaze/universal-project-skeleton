/* global document:false */
import _ from 'lodash'

function component() {
  var element = document.createElement('div')

  /* lodash is required for the next line to work */
  element.innerHTML = _.join(['Hello', 'Webpack'], ' ')

  return element
}

function startApp() {
  document.body.appendChild(component())
}

if (window.cordova) {
  document.addEventListener('deviceready', startApp, false)
} else {
  startApp()
}

