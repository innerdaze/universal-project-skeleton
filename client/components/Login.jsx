import React, { Component } from 'react'
import LoginForm from 'grommet/components/LoginForm'
import Notification from 'grommet/components/Notification'
import Box from 'grommet/components/Box'

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
      <Box direction='column'>
        {this.props.error && (
          <Box direction='row'>
            <Notification message={this.props.error} status='critical'/>
          </Box>
        )}
        <Box direction='row'>
          <LoginForm
            title='Orbis mStock'
            onSubmit={this.handleLogin}
            usernameType='text'/>
        </Box>
      </Box>
    )
  }
}

Login.propTypes = {
  login: React.PropTypes.func,
  error: React.PropTypes.string
}

Login.defaultProps = {
  login: Function.prototype,
  error: null
}
