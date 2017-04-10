import React, { Component } from 'react'
import { Router, Route } from 'react-router'
import history from '../history'
import LoginContainer from '../containers/LoginContainer.jsx'
import AppLayout from '../components/AppLayout.jsx'
import MainLayout from '../components/MainLayout.jsx'
import OrdersLayout from '../components/OrdersLayout.jsx'

const routes = (
  <Route component={AppLayout}>
    <Route exact path="/" component={LoginContainer}/>
    <Route component={MainLayout}>
      <Route path="/orders" component={OrdersLayout}/>
    </Route>
  </Route>
)

export default class Root extends Component {

  render() {
    return (
      <Router history={history} routes={routes}/>
    )
  }

}
