import React, { Component } from 'react'
import PropTypes from 'prop-types'
import BarcodeInputFormContainer from '../containers/BarcodeInputFormContainer.jsx'
import ScannedItemListContainer from '../containers/ScannedItemListContainer.jsx'
import ProcessItemsButtonContainer from '../containers/ProcessItemsButtonContainer.jsx'
import OrdersHeaderLayout from '../components/OrdersHeaderLayout.jsx'
import MainMenu from '../components/MainMenu.jsx'
import Split from 'grommet/components/Split'
import Sidebar from 'grommet/components/Sidebar'
import Box from 'grommet/components/Box'

class OrdersLayout extends Component {
  constructor(props) {
    super(props)

    this.state = {
      mainMenuVisible: false
    }
  }

  componentWillReceiveProps(newProps) {
    if (this.state.mainMenuVisible === newProps.mainMenuVisible) {
      return false
    } else {
      this.setState({
        mainMenuVisible: newProps.mainMenuVisible
      })
    }
  }

  render() {
    return (
      <Split
        fixed={true}
        priority={this.state.mainMenuVisible ? 'left' : 'right'}
        flex='right'>
        <MainMenu/>
        <Box justify='center' pad='medium'>
          <OrdersHeaderLayout/>
          <BarcodeInputFormContainer/>
          <ScannedItemListContainer/>
          <ProcessItemsButtonContainer/>
        </Box>
      </Split>
    )
  }
}

OrdersLayout.propTypes = {
	mainMenuVisible: PropTypes.bool
}

OrdersLayout.defaultProps = {
	mainMenuVisible: false
}

export default OrdersLayout
