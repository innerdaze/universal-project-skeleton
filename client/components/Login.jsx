import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { appShortTitle } from '../config'
import LoginForm from 'grommet/components/LoginForm'
import Box from 'grommet/components/Box'
import Header from 'grommet/components/Header'
import Headline from 'grommet/components/Headline'

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
      <Box justify='center'
        align='center'
        full={true}>
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
  login: PropTypes.func.isRequired
}

Login.defaultProps = {
  login: Function.prototype
}
