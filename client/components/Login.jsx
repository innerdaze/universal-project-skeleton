import React from 'react'

import css from 'css/ratchet-theme-android.css'

export default class Login extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      user: '',
      password: ''
    }

    this.login = this.login.bind(this)
    this.handleUsernameChange = this.handleUsernameChange.bind(this)
    this.handlePasswordChange = this.handlePasswordChange.bind(this)
  }

  handleUsernameChange(e) {
    this.setState({user: e.target.value})
  }

  handlePasswordChange(e) {
    this.setState({password: e.target.value})
  }

  handleLogin(e) {
    e.preventDefault()

    /* Auth.login(this.state.user, this.state.password)
      .catch(function(err) {
        console.log("Error logging in", err)
      }) */
    console.log('user: %s, pass: %s', this.state.user, this.state.password)
  }

  render() {
    return (
      <form role="form">
        <div className="form-group">
          <input type="text" value={this.state.user} placeholder="Username" onChange={this.handleUsernameChange}/>
          <input type="password" value={this.state.password} placeholder="Password" onChange={this.handlePasswordChange}/>
        </div>
        <button className={css.btn} type="submit" onClick={this.handleLogin}>Press MEEEE!</button>
      </form>
    )
  }
}
