import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Box from 'grommet/components/Box'
import Label from 'grommet/components/Label'

class Splash extends Component {
  render() {
    return (
      <Box
        full
        justify='center'
        align='center'
        >
        {this.props.icon}
        {this.props.logo}
        {this.props.title}
        <Label>{this.props.loadingText}</Label>
      </Box>
    )
  }
}

Splash.propTypes = {
  loadingText: PropTypes.string,
  icon: PropTypes.instanceOf(Component),
  logo: PropTypes.instanceOf(Component),
  title: PropTypes.instanceOf(Component)
}

Splash.defaultProps = {
  loadingText: 'Loading...',
  icon: null,
  logo: null,
  tite: null
}

export default Splash
