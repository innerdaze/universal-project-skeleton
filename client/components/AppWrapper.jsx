import React from 'react'
import PropTypes from 'prop-types'
import { ConnectedRouter } from 'connected-react-router'
import RootContainer from '../containers/RootContainer'

const AppWrapper = ({ history }) => (
  <ConnectedRouter history={history}>
    <RootContainer/>
  </ConnectedRouter>
)

AppWrapper.propTypes = {
  history: PropTypes.object.isRequired
}

export default AppWrapper
