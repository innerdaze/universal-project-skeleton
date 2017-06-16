import React, { Component } from 'react'
import PropTypes from 'prop-types'
import List from 'grommet/components/List'
import Box from 'grommet/components/Box'
import ListPlaceholder from 'grommet-addons/components/ListPlaceholder'
import Splash from './Splash'
import ScannedItem from './ScannedItem'
import BlockingProcessDisplay from './BlockingProcessDisplay'
import ChangeOrderQuantityFormContainer from '../containers/ChangeOrderQuantityFormContainer'
import DeleteEntityForm from './DeleteEntityForm'

class ScannedItemList extends Component {
  constructor(props) {
    super(props)

    this.state = {
      selectedOrder: null
    }

    this.onChangeOrderQuantityClick = this.onChangeOrderQuantityClick.bind(this)
    this.onDeleteItemConfirm = this.onDeleteItemConfirm.bind(this)
    this.onDeleteItemCancel = this.onDeleteItemCancel.bind(this)
  }

  onChangeOrderQuantityClick(order) {
    this.props.onChangeOrderQuantityClick(order)
  }

  onDeleteItemClick(item) {
    this.props.onDeleteItemClick()

    this.setState({
      selectedOrder: item
    })
  }

  onDeleteItemConfirm() {
    this.props.onDeleteItemConfirm(this.state.selectedOrder._id)

    this.setState({
      selectedOrder: null
    })
  }

  onDeleteItemCancel() {
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
            onConfirm={this.onDeleteItemConfirm}
            onCancel={this.onDeleteItemCancel}
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
                onChangeQuantityClick={this.onChangeOrderQuantityClick.bind(this, item)}
                onDeleteClick={this.onDeleteItemClick.bind(this, item)}
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
  onChangeOrderQuantityClick: PropTypes.func.isRequired,
  isChangingOrderQuantity: PropTypes.bool.isRequired,
  isDeletingOrder: PropTypes.bool.isRequired
}

ScannedItemList.defaultProps = {
  onDeleteItemClick: Function.prototype,
  onChangeOrderQuantityClick: Function.prototype,
  isChangingOrderQuantity: false,
  isDeletingOrder: false
}

export default ScannedItemList
