import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import PropTypes from 'prop-types'
import { ConnectedRouter } from 'connected-react-router'
import Notification from 'grommet/components/Notification'
import history from '../history'
import AuthenticatedRoute from '../components/AuthenticatedRoute'
import LoginContainer from '../containers/LoginContainer'
import AppLayout from '../components/AppLayout'
import OrdersLayoutContainer from '../containers/OrdersLayoutContainer'
import InitializeContainer from '../containers/InitializeContainer'
import BlockingProcessDisplay from '../components/BlockingProcessDisplay'
import BackgroundSyncProgressContainer from '../containers/BackgroundSyncProgressContainer'
import { Offline, Online } from 'react-detect-offline'
import { errorOperations, errorSelectors } from '../features/error'
import OfflineNotificationContainer from '../containers/OfflineNotificationContainer'
const Root = ({
  initialized,
  authed,
  isSyncing,
  handleNotificationClose,
  error
}) => (
  <ConnectedRouter history={history}>
    <AppLayout>
      {error && (
        <Notification
          closer
          message={error}
          status='critical'
          onClose={handleNotificationClose}
        />
      )}
      {
        <OfflineNotificationContainer
          background='#FFD602'
          color='black'
          text='You are offline. Sync unavailable'
          fontSize='15px'
          height='25px'
          textAlign='center'
        />
      }
      {isSyncing && (
        <BlockingProcessDisplay
          component={<BackgroundSyncProgressContainer />}
        />
      )}
      <Switch>
        <Route
          path='/login'
          render={props =>
            initialized === true ? (
              authed === false ? (
                <LoginContainer />
              ) : (
                <Redirect to={props.from || '/'} />
              )
            ) : (
              <Redirect
                to={{
                  pathname: '/initialize',
                  state: {
                    from: props.from
                  }
                }}
              />
            )
          }
        />
        <Route
          path='/initialize'
          render={props =>
            initialized === false ? (
              <InitializeContainer />
            ) : (
              <Redirect to='/login' />
            )
          }
        />
        <AuthenticatedRoute
          path='/orders'
          component={OrdersLayoutContainer}
          authed={authed}
        />
        <Redirect from='/' to='/orders' />
      </Switch>
    </AppLayout>
  </ConnectedRouter>
)

Root.propTypes = {
  initialized: PropTypes.bool.isRequired,
  authed: PropTypes.bool.isRequired,
  isSyncing: PropTypes.bool.isRequired,
  handleNotificationClose: PropTypes.func.isRequired,
  error: PropTypes.string,
  from: PropTypes.string
}

Root.defaultProps = {
  error: null,
  from: '',
  initialized: false,
  authed: false,
  isSyncing: false,
  handleNotificationClose: Function.prototype
}

export default Root
