import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import PropTypes from 'prop-types'

const AuthenticatedRoute = ({ component: RenderComponent, authed, ...rest }) => (
  <Route
    {...rest}
    render={props => authed === true ?
      <RenderComponent {...props}/> :
      <Redirect
        to={{
          pathname: '/login',
          state: {
            from: props.location
          } }}
        />}
    />
)

AuthenticatedRoute.propTypes = {
  component: PropTypes.func.isRequired,
  authed: PropTypes.bool
}

AuthenticatedRoute.defaultProps = {
  authed: false
}

export default AuthenticatedRoute
