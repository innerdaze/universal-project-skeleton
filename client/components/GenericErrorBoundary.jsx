import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class ErrorBoundary extends Component {
  static propTypes = {
    renderError: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired
  }

  state = {
    error: null
  }

  componentDidCatch(error, info) {
    this.setState({ error })
  }

  render() {
    const { error } = this.state

    if (error) {
      return this.props.renderError({ error })
    }

    return this.props.children
  }
}
