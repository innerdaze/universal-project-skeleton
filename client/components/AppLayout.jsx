import React, { Component } from 'react'
import App from 'grommet/components/App'

class AppLayout extends Component {
  render() {
    return (
      <App centered={true}>
        { this.props.children }
      </App>
    )
  }
}

export default AppLayout
