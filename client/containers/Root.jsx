import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import { ConnectedRouter } from 'connected-react-router'
import PropTypes from 'prop-types'
import history from '../history'
import AppLayout from '../components/AppLayout.jsx'
import IndexContainer from '../containers/IndexContainer'
import OrdersLayoutContainer from '../containers/OrdersLayoutContainer'
import InitializeContainer from '../containers/InitializeContainer'
import LoginContainer from '../containers/LoginContainer.jsx'
import styles from '../assets/scss/orbis/index.scss'

export default () => (
  <ConnectedRouter history={history}>
    <AppLayout>
      <Switch>
        <Route exact path='/' component={IndexContainer}/>
        <Route path='/login' component={LoginContainer}/>
        <Route path='/orders' component={OrdersLayoutContainer}/>
        <Route path='/initialize' component={InitializeContainer}/>
      </Switch>
    </AppLayout>
  </ConnectedRouter>
)
