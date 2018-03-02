import { connect } from 'react-redux'
import ProductSearch from '../components/ProductSearch'
import { productOperations, productSelectors } from '../features/product'
import { orderOperations } from '../features/order'

export default connect(
  state => ({
    results: productSelectors.lastMatches(state)
  }),
  dispatch => ({
    search: query =>
      dispatch(
        productOperations.searchProducts(
          query,
          productOperations.searchProductByProductName
        )
      ),
    onSelect: product => dispatch(orderOperations.submitProduct(product))
  })
)(ProductSearch)
