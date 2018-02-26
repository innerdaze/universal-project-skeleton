import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Responsive from 'grommet/utils/Responsive'
import App from 'grommet/components/App'

class AppLayout extends Component {
  constructor(props) {
    super(props)

    this.state = {}

    this._onResponsive = this._onResponsive.bind(this)
  }

  componentDidMount() {
    this._responsive = Responsive.start(this._onResponsive)
  }

  componentWillUnmount() {
    this._responsive.stop()
  }

  _onResponsive(small) {
    this.setState({ small })
  }

  render() {
    return (
      <App centered>
        { this.props.children }
      </App>
    )
  }
}

AppLayout.propTypes = {
  children: PropTypes.array.isRequired
}

export default AppLayout
