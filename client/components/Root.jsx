import React, { Component } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import { ConnectedRouter } from 'connected-react-router'
import PropTypes from 'prop-types'
import Layer from 'grommet/components/Layer'
import Notification from 'grommet/components/Notification'
import history from '../history'
import AuthenticatedRoute from '../components/AuthenticatedRoute'
import LoginContainer from '../containers/LoginContainer'
import AppLayout from '../components/AppLayout'
import OrdersLayoutContainer from '../containers/OrdersLayoutContainer'
import InitializeContainer from '../containers/InitializeContainer'
import BlockingProcessDisplay from '../components/BlockingProcessDisplay'
import BackgroundSyncProgressContainer from '../containers/BackgroundSyncProgressContainer'
import styles from '../assets/scss/orbis/index.scss'

export default ({
  initialized = false,
  authed = false,
  isSyncing = false,
  handleNotificationClose,
  error
}) => (
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
      {isSyncing && <BlockingProcessDisplay component={<BackgroundSyncProgressContainer/>}/>}
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
