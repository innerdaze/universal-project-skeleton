import React, { Component } from 'react'
import ListItem from 'grommet/components/ListItem'
import Box from 'grommet/components/Box'
import Menu from 'grommet/components/Menu'
import Anchor from 'grommet/components/Anchor'
import ActionsIcon from 'grommet/components/icons/base/Actions'
import EditIcon from 'grommet/components/icons/base/Edit'
import TrashIcon from 'grommet/components/icons/base/Trash'

class ScannedItem extends Component {

  render() {
    return (
      <ListItem
        justify='between'
        responsive={false}>
        <Box direction='row' basis='1/2' justify='between'>
          <Box>{this.props.productID}</Box>
          <Box>{this.props.title}</Box>
        </Box>
        <Box direction='row' basis='1/2' justify='end' textAlign='right'>
          <Box className="secondary">{this.props.quantity} x Units</Box>
          <Menu
            icon={<ActionsIcon/>}>
            <Anchor
              icon={<EditIcon/>}
              label='Change Quantity'
              onClick={this.props.onChangeQuantityClick}/>
            <Anchor
              icon={<TrashIcon/>}
              label='Delete Order'
              onClick={this.props.onDeleteClick}/>
          </Menu>
        </Box>
      </ListItem>
    )
  }
}

ScannedItem.propTypes = {
  id: React.PropTypes.string.isRequired,
  title: React.PropTypes.string.isRequired,
  onClick: React.PropTypes.func.isRequired
}

ScannedItem.defaultProps = {
  id: null,
  title: null,
  onClick: Function.prototype
}

export default ScannedItem
