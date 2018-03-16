import { connect } from 'react-redux'
import ProductSearch from '../components/ProductSearch'
import { productOperations, productSelectors } from '../ducks/product'
import { orderOperations } from '../ducks/order'

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
