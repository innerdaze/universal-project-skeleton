import { connect } from 'react-redux'
import ProductSearch from '../components/ProductSearch'
import { searchProductByProductName, searchProducts } from '../actions/ProductActions'
import { createPendingTransactionByProduct } from '../actions/OrderActions'

export default connect(state => ({
  results: state.productSearch.lastMatches
}), dispatch => ({
  search: query => dispatch(searchProducts(query, searchProductByProductName)),
  onSelect: product => dispatch(createPendingTransactionByProduct(product))
}))(ProductSearch)
