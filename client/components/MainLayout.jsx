import React, { Component } from 'react'
import Box from 'grommet/components/Box'
import Header from 'grommet/components/Header'
import Heading from 'grommet/components/Heading'
import Section from 'grommet/components/Section'

export default class MainLayout extends Component {

  render() {
    return (
      <Box full={true}>
        <Header
          direction='row'
          justify='between'
          pad={{ horizontal: 'medium' }}>
          <Heading>Orders</Heading>
        </Header>
        <Section primary={true}>
          {this.props.children}
        </Section>
      </Box>
    )
  }
}

MainLayout.propTypes = {
  children: React.PropTypes.node.isRequired
}
