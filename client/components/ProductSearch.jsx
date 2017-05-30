import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { map } from 'lodash'
import Search from 'grommet/components/Search'

class ProductSearch extends Component {
  constructor(props) {
    super(props)

    this._onSearch = this._onSearch.bind(this)
    this._onSelect = this._onSelect.bind(this)
  }

  _onSearch({ target }) {
    target.value.length > 2 && this.props.search(target.value)
  }


  _onSelect({ target, suggestion }, selected) {
    this.props.onSelect(suggestion.product)
  }

  render() {
    return (
      <Search responsive={true}
        placeHolder='Enter product name'
        dropAlign={{'left':'left'}}
        onDOMChange={this._onSearch}
        onSelect={this._onSelect}
        suggestions={map(
          this.props.results, product => ({
            label: product.ProductName,
            product
          })
        )}/>
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
