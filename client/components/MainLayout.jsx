import React, { Component } from 'react'
import Box from 'grommet/components/Box'
import Section from 'grommet/components/Section'

export default class MainLayout extends Component {

  render() {
    return this.props.children

  }
}

MainLayout.propTypes = {
  children: React.PropTypes.node.isRequired
}
