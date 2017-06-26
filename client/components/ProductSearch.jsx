import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { map } from 'lodash'
import Search from 'grommet/components/Search'

class ProductSearch extends Component {
  constructor(props) {
    super(props)

    this.handleSearch = this.handleSearch.bind(this)
    this.handleSelect = this.handleSelect.bind(this)
  }

  handleSearch({ target }) {
    if (target.value.length > 2) {
      this.props.search(target.value)
    }
  }

  handleSelect({ target, suggestion }) {
    this.props.onSelect(suggestion.product)
  }

  render() {
    return (
      <Search
        responsive
        placeHolder='Enter product name'
        dropAlign={{ left: 'left' }}
        onDOMChange={this.handleSearch}
        onSelect={this.handleSelect}
        suggestions={map(
          this.props.results, product => ({
            product,
            label: product.ProductName
          })
        )}
        />
    )
  }
}

ProductSearch.propTypes = {
  search: PropTypes.func.isRequired,
  onSelect: PropTypes.func.isRequired,
  results: PropTypes.array.isRequired
}

PropTypes.defaultProps = {
  search: Function.prototype,
  onSelect: Function.prototype,
  results: []
}

export default ProductSearch
