import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Split from 'grommet/components/Split'
import Box from 'grommet/components/Box'
import BarcodeInputFormContainer from '../containers/BarcodeInputFormContainer'
import ScannedItemListContainer from '../containers/ScannedItemListContainer'
import ProcessItemsButtonContainer from '../containers/ProcessItemsButtonContainer'
import OrdersHeaderLayout from '../components/OrdersHeaderLayout'
import ChangeOrderQuantityFormContainer from '../containers/ChangeOrderQuantityFormContainer'
import PromptStartModifyingTransaction from '../components/PromptStartModifyingTransaction'
import MainMenu from '../components/MainMenu'

class OrdersLayout extends Component {
  constructor(props) {
    super(props)

    this.state = {
      mainMenuVisible: false
    }

    this._onSetQuantityCancel = this._onSetQuantityCancel.bind(this)
    this._onSetQuantitySubmit = this._onSetQuantitySubmit.bind(this)
    this.handlePromptStartModifyingSubmit = this.handlePromptStartModifyingSubmit.bind(this)
    this.handlePromptStartModifyingCancel = this.handlePromptStartModifyingCancel.bind(this)
  }

  _onSetQuantityCancel() {
    this.props.onChangeOrderQuantityCancel()
  }

  _onSetQuantitySubmit(transactionID, quantity) {
    this.props.onChangeOrderQuantitySubmit(quantity)
  }

  handlePromptStartModifyingCancel() {
    this.props.onPromptStartModifyingCancel()
  }

  handlePromptStartModifyingSubmit() {
    this.props.onPromptStartModifyingSubmit(this.props.pendingModification)
  }

  render() {
    return (
      <Split
        fixed
        priority={this.props.mainMenuVisible ? 'left' : 'right'}
        flex='right'
        >
        <MainMenu/>
        <Box justify='center' pad='medium'>
          {this.props.pendingModification && (
            <PromptStartModifyingTransaction
              order={this.props.pendingModification}
              onSubmit={this.handlePromptStartModifyingSubmit}
              onCancel={this.handlePromptStartModifyingCancel}
              />
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
  isChangingOrderQuantity: PropTypes.bool.isRequired,
  onChangeOrderQuantitySubmit: PropTypes.func.isRequired,
  onChangeOrderQuantityCancel: PropTypes.func.isRequired,
  onPromptStartModifyingSubmit: PropTypes.func.isRequired,
  onPromptStartModifyingCancel: PropTypes.func.isRequired
}

OrdersLayout.defaultProps = {
  mainMenuVisible: false,
  pendingModification: null
}

export default OrdersLayout
