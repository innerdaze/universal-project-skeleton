import React, { Component } from 'react'
import PropTypes from 'prop-types'
import LoginForm from 'grommet/components/LoginForm'
import Box from 'grommet/components/Box'
import { appShortTitle } from '../config'

export default class Login extends Component {
  constructor(props) {
    super(props)

    this.state = {
      username: '',
      password: ''
    }

    this.handleLogin = this.handleLogin.bind(this)
  }

  handleLogin(data) {
    this.props.login(data.username, data.password)
  }

  render() {
    return (
      <Box
        full
        justify='center'
        align='center'
        >
        <LoginForm
          title={appShortTitle}
          secondaryText='By Orbis'
          usernameType='text'
          onSubmit={this.handleLogin}
          />
      </Box>
    )
  }
}

Login.propTypes = {
  login: PropTypes.func.isRequired
}

Login.defaultProps = {
  login: Function.prototype
}
