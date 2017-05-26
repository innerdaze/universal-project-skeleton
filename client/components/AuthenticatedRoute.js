import React, { Component } from 'react'
import { Route, Redirect } from 'react-router-dom'
import PropTypes from 'prop-types'

export default ({ component: RenderComponent, authed, ...rest }) => (
  <Route
    {...rest}
    render={props => authed === true
      ? <RenderComponent {...props} />
      : <Redirect to={{
        pathname: '/login',
        state: {
          from: props.location
        }}}/>}
  />
)
