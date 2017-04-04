import React, { Component } from 'react'

import NavigationBar from '../components/NavigationBar.jsx'

export default class MainLayout extends Component {

  render() {
    return (
      <div className="app">
        <main>
          {this.props.children}
        </main>
        <NavigationBar/>
      </div>
    )
  }
}

MainLayout.propTypes = {
  children: React.PropTypes.node.isRequired
}
