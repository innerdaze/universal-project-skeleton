import React, { Component } from 'react'
import PropTypes from 'prop-types'
import BarcodeInputFormContainer from '../containers/BarcodeInputFormContainer.jsx'
import ScannedItemListContainer from '../containers/ScannedItemListContainer.jsx'
import ProcessItemsButtonContainer from '../containers/ProcessItemsButtonContainer.jsx'
import OrdersHeaderLayout from '../components/OrdersHeaderLayout.jsx'
import ChangeOrderQuantityFormContainer from '../containers/ChangeOrderQuantityFormContainer'
import PromptStartModifyingTransaction from '../components/PromptStartModifyingTransaction'
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
    this._onPromptStartModifyingSubmit = this._onPromptStartModifyingSubmit.bind(this)
    this._onPromptStartModifyingCancel = this._onPromptStartModifyingCancel.bind(this)
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

  _onPromptStartModifyingCancel() {
    this.props.onPromptStartModifyingCancel()
  }

  _onPromptStartModifyingSubmit() {
    this.props.onPromptStartModifyingSubmit(this.props.pendingModification)
  }

  render() {
    return (
      <Split
        fixed={true}
        priority={this.state.mainMenuVisible ? 'left' : 'right'}
        flex='right'>
        <MainMenu/>
        <Box justify='center' pad='medium'>
          {this.props.pendingModification && (
            <PromptStartModifyingTransaction
              order={this.props.pendingModification}
              onSubmit={this._onPromptStartModifyingSubmit}
              onCancel={this._onPromptStartModifyingCancel}/>
          )}
          {this.props.isChangingOrderQuantity && (
            <ChangeOrderQuantityFormContainer/>
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
  pendingModification: PropTypes.object,
  onChangeOrderQuantitySubmit: PropTypes.func.isRequired,
  onChangeOrderQuantityCancel: PropTypes.func.isRequired,
  onPromptStartModifyingSubmit: PropTypes.func.isRequired,
  onPromptStartModifyingCancel: PropTypes.func.isRequired
}

OrdersLayout.defaultProps = {
	mainMenuVisible: false,
  pendingModification: null,
  onChangeOrderQuantitySubmit: Function.prototype,
  onChangeOrderQuantityCancel: Function.prototype,
  onPromptStartModifyingSubmit: Function.prototype,
  onPromptStartModifyingCancel: Function.prototype
}

export default OrdersLayout
