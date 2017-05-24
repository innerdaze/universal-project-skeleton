import React, { Component } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import PropTypes from 'prop-types'

class Index extends Component {
  render() {
    const {isInitialized, isLoggedIn} = this.props
    const route = !isInitialized ? '/initialize' : !isLoggedIn ? '/login' : '/orders'

    return (
      <Redirect to={route}/>
    )
  }
}

Index.propTypes = {
  isInitialized: PropTypes.bool.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}

Index.defaultProps = {
  isInitialized: false,
  isLoggedIn: false
}

export default Index
