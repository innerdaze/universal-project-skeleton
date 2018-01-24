import { createActions } from 'redux-actions';
import { v4 as uuidGen } from 'uuid'
import { find, filter, includes, map } from 'lodash'
import {
  REQUEST_PRODUCTS,
  RECEIVE_PRODUCTS,
  INVALIDATE_PRODUCTS,
  RESET_PRODUCTS,
  SEARCH_PRODUCTS,
  FAIL_SEARCH_PRODUCTS,
  SUCCEED_SEARCH_PRODUCTS
} from '../../constants/ActionTypes'


const identityActions = createIdentityActionMap(
  REQUEST_PRODUCTS,
  INVALIDATE_PRODUCTS,
  RESET_PRODUCTS,
  SEARCH_PRODUCTS
)
export default createActions({
  PRODUCT: {
    RECEIVE_PRODUCTS: json => json,
    SUCCEED_SEARCH_PRODUCTS: matches => matches,
    FAIL_SEARCH_PRODUCTS: query => query,
    ...identityActions
  }
}
);
