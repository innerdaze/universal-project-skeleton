import React, { Component } from 'react'
import ScannedItem from './ScannedItem.jsx'

class ScannedItemList extends Component {
  render() {
    return (
      <ul>
        {this.props.items.map(item => (
          <ScannedItem
            key={item.id}
            id={item.productId}
            {...item}
            onClick={this.props.onItemClick}
            />
        ))}
      </ul>
    )
  }
}

ScannedItemList.propTypes = {
  items: React.PropTypes.array,
  onItemClick: React.PropTypes.func
}

ScannedItemList.defaultProps = {
  items: [],
  onItemClick: Function.prototype
}

export default ScannedItemList
