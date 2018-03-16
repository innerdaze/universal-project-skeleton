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
    items: PropTypes.array,
    renderItem: PropTypes.func.isRequired
  }

  static defaultProps = {
    isDeletingOrder: false,
    isProcessing: false,
    items: []
  }

  state = {
    selectedItem: null
  }

  @autobind
  handleChangeOrderQuantityClick(order) {
    this.props.onChangeOrderQuantityClick(order)
  }

  @autobind
  handleDeleteItemClick(item) {
    this.props.onDeleteItemClick()

    this.setState({
      selectedItem: item
    })
  }

  @autobind
  handleDeleteItemConfirm() {
    this.props.onDeleteItemConfirm(this.state.selectedItem._id)

    this.setState({
      selectedItem: null
    })
  }

  @autobind
  handleDeleteItemCancel() {
    this.props.onDeleteItemCancel()
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
            this.props.items.map(item =>
              this.props.renderItem({
                ...item,
                onChangeQuantityClick: this.handleChangeOrderQuantityClick,
                onDeleteClick: this.handleDeleteItemClick
              })
            )
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
