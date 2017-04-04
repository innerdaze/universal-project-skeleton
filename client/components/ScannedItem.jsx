import React from 'react'

const ScannedItem = ({ onClick, productId, title, quantity }) => (
  <li onClick={onClick}>
    <span>{productId}</span>
    <span>{title}</span>
    <span>{quantity} x Units</span>
  </li>
)

ScannedItem.propTypes = {
  onClick: React.PropTypes.func,
  productId: React.PropTypes.string.isRequired,
  title: React.PropTypes.string.isRequired,
  quantity: React.PropTypes.number.isRequired
}

ScannedItem.defaultProps = {
  onClick: Function.prototype
}

export default ScannedItem
