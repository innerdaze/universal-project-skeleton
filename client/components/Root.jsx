import React, { Component } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import { ConnectedRouter } from 'connected-react-router'
import PropTypes from 'prop-types'
import history from '../history'
import AuthenticatedRoute from '../components/AuthenticatedRoute'
import LoginContainer from '../containers/LoginContainer'
import AppLayout from '../components/AppLayout'
import OrdersLayoutContainer from '../containers/OrdersLayoutContainer'
import InitializeContainer from '../containers/InitializeContainer'
import Notification from 'grommet/components/Notification'
import styles from '../assets/scss/orbis/index.scss'

export default ({ initialized, authed, error, handleNotificationClose }) => (
  <ConnectedRouter history={history}>
    <AppLayout>
      {error && (
        <Notification
          message={error}
          status="critical"
          onClose={handleNotificationClose}
          closer={true}
          />
      )}
      <Switch>
        <Route path='/login' render={props => initialized === true
          ? authed === false
            ? <LoginContainer/>
            : <Redirect to={props.from || '/'}/>
          : <Redirect to={{
              pathname: '/initialize',
              state: {
                from: props.from
              }}}/>
        }/>
        <Route path='/initialize' render={props => initialized === false
          ? <InitializeContainer/>
          : <Redirect to='/login'/>
        }/>
      <AuthenticatedRoute path='/orders' component={OrdersLayoutContainer} authed={authed}/>
      <Redirect from='/' to='/orders'/>
      </Switch>
    </AppLayout>
  </ConnectedRouter>
)
