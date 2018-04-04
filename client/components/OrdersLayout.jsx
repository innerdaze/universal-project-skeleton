import React, { Component } from 'react'
import PropTypes from 'prop-types'
import autobind from 'autobind-decorator'
import Split from 'grommet/components/Split'
import Box from 'grommet/components/Box'
import Modes from '../constants/OperationModes'
import PriceCheck from '../components/PriceCheck'
import BarcodeInputFormContainer from '../containers/BarcodeInputFormContainer'
import ScannedItemListContainer from '../containers/ScannedItemListContainer'
import WastageListContainer from '../containers/WastageListContainer'
import ProcessItemsButtonContainer from '../containers/ProcessItemsButtonContainer'
import ProcessWastageButtonContainer from '../containers/ProcessWastageButtonContainer'
import ChangeOrderQuantityFormContainer from '../containers/ChangeOrderQuantityFormContainer'
import ChangeWastageTypeFormContainer from '../containers/ChangeWastageTypeFormContainer'
import PromptStartModifyingTransaction from './PromptStartModifyingTransaction'
import OrdersHeaderLayout from './OrdersHeaderLayout'
import OrderMetaToggle from './OrderMetaToggle'
import ScannedItem from './ScannedItem'
import WastageItem from './WastageItem'
import MainMenu from './MainMenu'
import LoadingScreen from 'react-loading-screen'

class OrdersLayout extends Component {
  state = {
    mainMenuVisible: false
  }

  @autobind
  handlePromptStartModifyingCancel() {
    this.props.onPromptStartModifyingCancel()
  }

  @autobind
  handlePromptStartModifyingSubmit() {
    this.props.onPromptStartModifyingSubmit(this.props.pendingModification)
  }

  @autobind
  handleChangeWastageTypeClick(order) {
    this.props.onChangeWastageTypeClick(order)
  }

  @autobind
  handleChangeOrderQuantityClick(order) {
    this.props.onChangeOrderQuantityClick(order)
  }

  @autobind
  renderContent() {
    let innerComponent

    switch (this.props.activeMode) {
      case Modes.WASTAGE:
        innerComponent = (
          <WastageListContainer
            renderItem={item => (
              <WastageItem
                key={item._id}
                id={item._id}
                data={item}
                quantity={item.Qty}
                render={() => (
                  <Box flex={true}>
                    <Box>{item.ProductID}</Box>
                    <Box style={{ fontWeight: 600 }}>{item.ProductName}</Box>
                    <Box style={{ fontWeight: 600 }}>
                      {this.props.wastageTypeNameForOrderId(item._id)}
                    </Box>
                  </Box>
                )}
                onChangeQuantityClick={item.onChangeQuantityClick}
                onChangeWastageTypeClick={this.handleChangeWastageTypeClick}
                onDeleteClick={item.onDeleteClick}
              />
            )}
          />
        )
        break
      case Modes.PRICE_CHECK:
        innerComponent = <PriceCheck />
        break
      default:
        innerComponent = (
          <ScannedItemListContainer
            renderItem={item => (
              <ScannedItem
                key={item._id}
                id={item._id}
                data={item}
                quantity={item.Qty}
                render={() => (
                  <Box flex={true}>
                    <Box>{item.ProductID}</Box>
                    <Box style={{ fontWeight: 600 }}>{item.ProductName}</Box>
                    <OrderMetaToggle order={item} />
                  </Box>
                )}
                onChangeQuantityClick={item.onChangeQuantityClick}
                onDeleteClick={item.onDeleteClick}
              />
            )}
          />
        )
        break
    }

    return innerComponent
  }

  @autobind
  renderProcessButton() {
    let ButtonComponent

    switch (this.props.activeMode) {
      case Modes.WASTAGE:
        ButtonComponent = <ProcessWastageButtonContainer />
        break
      case Modes.PRICE_CHECK:
        ButtonComponent = null
        break
      default:
        ButtonComponent = <ProcessItemsButtonContainer />
    }

    return ButtonComponent
  }

  render() {
    return (
      <Split
        fixed
        priority={this.props.mainMenuVisible ? 'left' : 'right'}
        flex='right'
      >
        <MainMenu />
        <Box justify='center' pad='medium'>
          {/* <LoadingScreen title='Loading' subTitle='More text' isOpen={true} /> */}
          {this.props.pendingModification && (
            <PromptStartModifyingTransaction
              order={this.props.pendingModification}
              onSubmit={this.handlePromptStartModifyingSubmit}
              onCancel={this.handlePromptStartModifyingCancel}
            />
          )}
          {this.props.isChangingOrderQuantity && (
            <ChangeOrderQuantityFormContainer />
          )}
          {this.props.isChangingWastageType && (
            <ChangeWastageTypeFormContainer />
          )}
          <OrdersHeaderLayout />
          <BarcodeInputFormContainer />
          {this.renderContent()}
          {this.renderProcessButton()}
        </Box>
      </Split>
    )
  }
}

OrdersLayout.propTypes = {
  mainMenuVisible: PropTypes.bool,
  pendingModification: PropTypes.object,
  isChangingOrderQuantity: PropTypes.bool,
  onPromptStartModifyingSubmit: PropTypes.func.isRequired,
  onPromptStartModifyingCancel: PropTypes.func.isRequired,
  isChangingWastageType: PropTypes.bool.isRequired,
  activeMode: PropTypes.number.isRequired,
  wastageTypeNameForOrderId: PropTypes.func.isRequired
}

OrdersLayout.defaultProps = {
  mainMenuVisible: false,
  pendingModification: null,
  isChangingOrderQuantity: false,
  isChangingWastageType: false
}

export default OrdersLayout
