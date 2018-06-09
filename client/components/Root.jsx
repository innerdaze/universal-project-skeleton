import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import PropTypes from 'prop-types'
import { ConnectedRouter } from 'connected-react-router'
import Notification from 'grommet/components/Notification'
import history from '../history'
import AuthenticatedRoute from '../components/AuthenticatedRoute'
import AppLayout from '../components/AppLayout'
import GenericErrorBoundary from './GenericErrorBoundary'

const Root = ({}) => (
  <ConnectedRouter history={history}>
    <AppLayout>
      <GenericErrorBoundary
        renderError={() => (
          <Notification
            closer
            message={error}
            status='critical'
            onClose={handleNotificationClose}
          />
        )}
      >
        <h1>{'hi'}</h1>
      </GenericErrorBoundary>
    </AppLayout>
  </ConnectedRouter>
)

Root.propTypes = {}

Root.defaultProps = {}

export default Root
