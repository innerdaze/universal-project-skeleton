import React, { Component } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import PropTypes from 'prop-types'

class Index extends Component {
  // shouldComponentUpdate(newProps) {
  //   debugger
  //   if (newProps.location.pathname !== this.props.location.pathname) {
  //     return true
  //   }
  //   return false
  // }

  render() {
    const {isInitialized, isLoggedIn, location } = this.props
    const route = !isInitialized ? '/initialize' : !isLoggedIn ? '/login' : '/orders'

    console.log(`Redirecting to ${route}`)
    //<p>Redirect to={route}</p>
    //<Redirect to={route}/>

    return (
      <div id={location}>
        <Redirect to={route}/>
      </div>
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
