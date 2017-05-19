import React, { Component } from 'react'
import { Router, Route, IndexRoute } from 'react-router'
import history from '../history'
import LoginContainer from '../containers/LoginContainer.jsx'
import AppLayout from '../components/AppLayout.jsx'
import OrdersLayoutContainer from '../containers/OrdersLayoutContainer'
import styles from '../assets/scss/orbis/index.scss'

const routes = (
  <Route component={AppLayout}>
    <Route exact path="/" component={LoginContainer}/>
    <Route path="/orders" component={OrdersLayoutContainer}/>
  </Route>
)

export default class Root extends Component {
  render() {
    return (
      <Router history={history} routes={routes}/>
    )
  }
}
