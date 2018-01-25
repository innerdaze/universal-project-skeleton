import { connect } from 'react-redux'
import ProductSearch from '../components/ProductSearch'
import { productOperations,productSelectors } from '../ducks/productNotCompleted'
import {  orderOperations } from '../ducks/order'

export default connect(state => ({
  results: productSelectors.lastMatches
}), dispatch => ({
  search: query => dispatch(productOperations.searchProducts(query, productOperations.searchProductByProductName)),
  onSelect: product => dispatch(orderOperations.createPendingTransactionByProduct(product))
}))(ProductSearch)
