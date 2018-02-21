import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { map, apply } from 'ramda'
import { v4 } from 'uuid'
import autobind from 'autobind-decorator'
import List from 'grommet/components/List'
import Box from 'grommet/components/Box'
import ListPlaceholder from 'grommet-addons/components/ListPlaceholder'
import Splash from './Splash'
import ScannedItem from './ScannedItem'
import BlockingProcessDisplay from './BlockingProcessDisplay'
import DeleteEntityForm from './DeleteEntityForm'

class ScannedItemList extends Component {
  static propTypes = {
    onDeleteItemClick: PropTypes.func.isRequired,
    onDeleteItemConfirm: PropTypes.func.isRequired,
    onDeleteItemCancel: PropTypes.func.isRequired,
    onChangeOrderQuantityClick: PropTypes.func.isRequired,
    isDeletingOrder: PropTypes.bool,
    isProcessing: PropTypes.bool,
    items: PropTypes.array
  }

  static defaultProps = {
    isDeletingOrder: false,
    isProcessing: false,
    items: []
  }

  state = {
    selectedOrder: null
  }

  @autobind
  handleChangeOrderQuantityClick(order) {
    this.props.onChangeOrderQuantityClick(order)
  }

  @autobind
  handleDeleteItemClick(item) {
    this.props.onDeleteItemClick()

    this.setState({
      selectedOrder: item
    })
  }

  @autobind
  handleDeleteItemConfirm() {
    this.props.onDeleteItemConfirm(this.state.selectedOrder._id)

    this.setState({
      selectedOrder: null
    })
  }

  @autobind
  handleDeleteItemCancel() {
    this.props.onDeleteItemCancel()

    this.setState({
      selectedOrder: null
    })
  }

  _renderItemDetailPair(key, value) {
    return (
      <Box key={v4()} margin={{ right: 'medium' }} flex='grow'>
        <span style={{ color: '#6b6b6b', fontWeight: 600 }}>{key}</span> {value}
      </Box>
    )
  }

  @autobind
  _renderItem(order) {
    const {
      product: {
        ProductID,
        ProductName,
        SupplierID,
        PackSize,
        CurrStock,
        OnOrder,
        AvgSales
      }
    } = order

    return (
      <Box flex={true}>
        <Box>{ProductID}</Box>
        <Box style={{ fontWeight: 600 }}>{ProductName}</Box>
        <Box direction='row' justify='between' responsive={false} wrap>
          {map(apply(this._renderItemDetailPair), [
            ['Supplier Code', SupplierID],
            ['Pack Size', PackSize],
            ['In Stock', CurrStock],
            ['On Order', OnOrder],
            ['Avg Weekly Sales', AvgSales]
          ])}
        </Box>
      </Box>
    )
  }

  render() {
    return (
      <Box>
        {this.props.isDeletingOrder && (
          <DeleteEntityForm
            message='Confirm you would like to delete this item'
            onConfirm={this.handleDeleteItemConfirm}
            onCancel={this.handleDeleteItemCancel}
          />
        )}
        {this.props.isProcessing && (
          <BlockingProcessDisplay
            component={<Splash loadingText='Sending...' />}
          />
        )}
        <List>
          {this.props.items.length ? (
            this.props.items.map(item => (
              <ScannedItem
                key={item._id}
                id={item._id}
                data={item}
                quantity={item.Qty}
                render={this._renderItem}
                onChangeQuantityClick={this.handleChangeOrderQuantityClick}
                onDeleteClick={this.handleDeleteItemClick}
              />
            ))
          ) : (
            <ListPlaceholder
              emptyMessage='Nothing to process - Add some items to get started.'
              filteredTotal={this.props.items.length}
              unfilteredTotal={this.props.items.length}
            />
          )}
        </List>
      </Box>
    )
  }
}

export default ScannedItemList
