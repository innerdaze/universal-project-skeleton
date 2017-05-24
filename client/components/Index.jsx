import React, { Component } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import PropTypes from 'prop-types'

class Index extends Component {
  render() {
    const {isInitialized, isLoggedIn, location} = this.props
    const route = !isInitialized ? '/initialize' : !isLoggedIn ? '/login' : '/orders'

    return (
      <p>Redirect to={route}</p>
    )
  }
}

Index.propTypes = {
  location: PropTypes.object,
  isInitialized: PropTypes.bool.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}

Index.defaultProps = {
  location: null,
  isInitialized: false,
  isLoggedIn: false
}

export default Index
