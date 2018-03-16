import { createActions } from 'redux-actions'
import { createIdentityActionMap } from '../../helpers/features'
const identityActions = createIdentityActionMap(
  'REQUEST_PRODUCTS',
  'INVALIDATE_PRODUCTS',
  'RESET_PRODUCTS',
  'SEARCH_PRODUCTS'
)
export default createActions({
  PRODUCT: {
    RECEIVE_PRODUCTS: json => ({ json }),
    SUCCEED_SEARCH_PRODUCTS: matches => ({ matches }),
    FAIL_SEARCH_PRODUCTS: query => ({ query }),
    ...identityActions
  }
})
