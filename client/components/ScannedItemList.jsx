import React, { Component } from 'react'
import PropTypes from 'prop-types'
import List from 'grommet/components/List'
import Box from 'grommet/components/Box'
import ListPlaceholder from 'grommet-addons/components/ListPlaceholder'
import Splash from './Splash'
import ScannedItem from './ScannedItem'
import BlockingProcessDisplay from './BlockingProcessDisplay'
import DeleteEntityForm from './DeleteEntityForm'

class ScannedItemList extends Component {
  constructor(props) {
    super(props)

    this.state = {
      selectedOrder: null
    }

    this.handleDeleteItemConfirm = this.handleDeleteItemConfirm.bind(this)
    this.handleDeleteItemCancel = this.handleDeleteItemCancel.bind(this)
  }

  handleChangeOrderQuantityClick(order) {
    this.props.handleChangeOrderQuantityClick(order)
  }

  handleDeleteItemClick(item) {
    this.props.onDeleteItemClick()

    this.setState({
      selectedOrder: item
    })
  }

  handleDeleteItemConfirm() {
    this.props.onDeleteItemConfirm(this.state.selectedOrder._id)

    this.setState({
      selectedOrder: null
    })
  }

  handleDeleteItemCancel() {
    this.setState({
      selectedOrder: null
    })
  }

  render() {
    return (
      <Box>
        {
          this.props.isDeletingOrder &&
          <DeleteEntityForm
            message='Confirm you would like to delete this order'
            onConfirm={this.handleDeleteItemConfirm}
            onCancel={this.handleDeleteItemCancel}
            />
        }
        { this.props.isProcessing &&
          <BlockingProcessDisplay component={<Splash loadingText='Sending...'/>}/>
        }
        <List>
          {this.props.items.length ?
            this.props.items.map(item => (
              item && <ScannedItem
                key={item._id}
                id={item._id}
                productID={item.ProductID}
                title={item.productName}
                quantity={item.Qty}
                onChangeQuantityClick={this.handleChangeOrderQuantityClick.bind(this, item)}
                onDeleteClick={this.handleDeleteItemClick.bind(this, item)}
                />
            )) : <ListPlaceholder
              emptyMessage='Nothing to process - Add some items to get started.'
              filteredTotal={this.props.items.length}
              unfilteredTotal={this.props.items.length}
              />
          }
        </List>
      </Box>
    )
  }
}

ScannedItemList.propTypes = {
  onDeleteItemClick: PropTypes.func.isRequired,
  onDeleteItemConfirm: PropTypes.func.isRequired,
  handleChangeOrderQuantityClick: PropTypes.func.isRequired,
  isDeletingOrder: PropTypes.bool.isRequired,
  isProcessing: PropTypes.bool.isRequired,
  items: PropTypes.array.isRequired
}

ScannedItemList.defaultProps = {
  onDeleteItemClick: Function.prototype,
  onDeleteItemConfirm: Function.prototype,
  handleChangeOrderQuantityClick: Function.prototype,
  isDeletingOrder: false,
  isProcessing: false,
  items: []
}

export default ScannedItemList
