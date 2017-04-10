import React, { Component, PropTypes } from 'react'
import List from 'grommet/components/List'
import Box from 'grommet/components/Box'
import ScannedItem from './ScannedItem.jsx'
import ChangeOrderQuantityFormContainer from '../containers/ChangeOrderQuantityFormContainer.jsx'
import DeleteEntityForm from '../components/DeleteEntityForm.jsx'

class ScannedItemList extends Component {

  constructor(props) {
    super(props)

    this.state = {
      selectedOrder: null,
      isChangingOrderQuantity: false
    }

    this.onChangeOrderQuantityClick = this.onChangeOrderQuantityClick.bind(this)
    this.onChangeOrderQuantitySubmit = this.onChangeOrderQuantitySubmit.bind(this)
    this.onChangeOrderQuantityCancel = this.onChangeOrderQuantityCancel.bind(this)
    this.onDeleteItemConfirm = this.onDeleteItemConfirm.bind(this)
    this.onDeleteItemCancel = this.onDeleteItemCancel.bind(this)
  }

  onChangeOrderQuantityClick(order) {
    this.setState({
      selectedOrder: order,
      isChangingOrderQuantity: true
    })
  }

  onChangeOrderQuantitySubmit() {
    this.setState({
      isChangingOrderQuantity: false,
      selectedOrder: null
    })
  }

  onChangeOrderQuantityCancel() {
    this.setState({
      isChangingOrderQuantity: false,
      selectedOrder: null
    })
  }

  onDeleteItemClick(item) {
    this.setState({
      isDeletingOrder: true,
      selectedOrder: item
    })
  }

  onDeleteItemConfirm() {

    this.setState({
      isDeletingOrder: false
    })

    this.props.onDeleteItemClick(this.state.selectedOrder.Barcode)

    this.setState({
      selectedOrder: null
    })
  }

  onDeleteItemCancel() {
    this.setState({
      isDeletingOrder: false,
      selectedOrder: null
    })
  }

  render() {
    return (
      <Box>
        { this.state.isChangingOrderQuantity &&
          <ChangeOrderQuantityFormContainer
            order={this.state.selectedOrder}
            onSubmit={this.onChangeOrderQuantitySubmit}
            onCancel={this.onChangeOrderQuantityCancel}/>
        }
        {
          this.state.isDeletingOrder &&
          <DeleteEntityForm
            message='Confirm you would like to delete this order'
            onConfirm={this.onDeleteItemConfirm}
            onCancel={this.onDeleteItemCancel}/>
        }
        <List>
          {this.props.items.map(item => (
            item && <ScannedItem
              key={item.Barcode}
              id={item.Barcode}
              productID={item.productID}
              title={item.productName}
              quantity={item.Qty}
              onChangeQuantityClick={this.onChangeOrderQuantityClick.bind(this, item)}
              onDeleteClick={this.onDeleteItemClick.bind(this, item)} />
          ))}
        </List>
      </Box>
    )
  }
}

ScannedItemList.propTypes = {
  onDeleteItemClick: PropTypes.func.isRequired
}

ScannedItemList.defaultProps = {
  onDeleteItemClick: Function.prototype
}

export default ScannedItemList
