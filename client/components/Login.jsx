import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { appShortTitle } from '../config'
import LoginForm from 'grommet/components/LoginForm'
import Notification from 'grommet/components/Notification'
import Box from 'grommet/components/Box'
import Header from 'grommet/components/Header'
import Headline from 'grommet/components/Headline'

export default class Login extends Component {

  constructor(props) {
    super(props)

    this.state = {
      username: '',
      password: '',
      error: '',
      initialized: false
    }

    this.handleLogin = this.handleLogin.bind(this)
  }

  componentDidMount() {
    // this.props.redirectToInitialize()
  }

  componentWillReceiveProps(newProps){
    const { error, initialized } = newProps

    if ({ error, initialized } === {
      error: this.state.error,
      initialized: this.state.initialized
    }) {
      return false
    } else {
      this.setState({ error, initialized })
    }
  }

  handleNotificationClose() {
    this.state.error = null
  }

  handleLogin(data) {
    this.props.login(data.username, data.password)
  }

  render() {
    return (
      <Box justify='center'
        align='center'
        full={true}>
        {this.state.error && (
          <Notification message={this.state.error} status="critical" onClose={this.onNotificationClose} />
        )}
        <LoginForm
          title={appShortTitle}
          secondaryText='By Orbis'
          onSubmit={this.handleLogin}
          usernameType='text'
          />
      </Box>
    )
  }
}

Login.propTypes = {
  login: PropTypes.func,
  error: PropTypes.string
}

Login.defaultProps = {
  login: Function.prototype,
  error: null
}
