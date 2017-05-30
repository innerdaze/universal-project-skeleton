import React, { Component } from 'react'
import PropTypes from 'prop-types'
import List from 'grommet/components/List'
import ListItem from 'grommet/components/ListItem'

class ProductSearchResults extends Component {
  render() {
    return (
      <List>
        {this.props.items.length &&
          this.props.items.map(item => (
            <ListItem justify='between'
              separator='horizontal'>
              <span>
                {item.ProductName}
              </span>
            </ListItem>
        ))}
      </List>
    )
  }
}

ProductSearchResults.propTypes = {
  results: PropTypes.array.isRequired
}

ProductSearchResults.defaultProps = {
  results: []
}

export default ProductSearchResults
