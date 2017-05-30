import React, { Component } from 'react'
import PropTypes from 'prop-types'
import BarcodeInputFormContainer from '../containers/BarcodeInputFormContainer.jsx'
import ScannedItemListContainer from '../containers/ScannedItemListContainer.jsx'
import ProcessItemsButtonContainer from '../containers/ProcessItemsButtonContainer.jsx'
import OrdersHeaderLayout from '../components/OrdersHeaderLayout.jsx'
import ChangeOrderQuantityForm from '../components/ChangeOrderQuantityForm'
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

    this._onSetQuantityCancel = this._onSetQuantityCancel.bind(this)
    this._onSetQuantitySubmit = this._onSetQuantitySubmit.bind(this)
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

  _onSetQuantityCancel() {
    this.props.onChangeOrderQuantityCancel()
  }

  _onSetQuantitySubmit(transactionID, quantity) {
    this.props.onChangeOrderQuantitySubmit(quantity)
  }

  render() {
    return (
      <Split
        fixed={true}
        priority={this.state.mainMenuVisible ? 'left' : 'right'}
        flex='right'>
        <MainMenu/>
        <Box justify='center' pad='medium'>
          {this.props.pendingTransaction && (
            <ChangeOrderQuantityForm
              order={this.props.pendingTransaction}
              onSubmit={this._onSetQuantitySubmit}
              onCancel={this._onSetQuantityCancel}/>
          )}
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
	mainMenuVisible: PropTypes.bool,
  pendingTransaction: PropTypes.object,
  onChangeOrderQuantitySubmit: PropTypes.func.isRequired,
  onChangeOrderQuantityCancel: PropTypes.func.isRequired
}

OrdersLayout.defaultProps = {
	mainMenuVisible: false,
  pendingTransaction: null,
  onChangeOrderQuantitySubmit: Function.prototype,
  onChangeOrderQuantityCancel: Function.prototype
}

export default OrdersLayout
