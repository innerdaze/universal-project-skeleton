import actions from './actions'
import { networkOperations } from '../network'
import { storeID } from '~features/app/selectors'
import { v4 as uuidGen } from 'uuid'
import { find, filter, includes, map, toLower } from 'lodash'

const productAction = actions.product

export const fetchProducts = () => (dispatch, getState) => {
  dispatch(productAction.requestProducts())

  return dispatch(
    networkOperations.callApi({
      service: 'HandheldService.GetProducts',
      params: {
        StoreID: storeID(getState())
      },
      success: json =>
        dispatch(
          productAction.receiveProducts(json.result.Result.ListOfProducts)
        )
    })
  )
}

export const findProductByProductName = productName => (dispatch, getState) => {
  const productID = getState().product.productIDsByProductName[productName]
  return productID && getState().product.productEntities[productID]
}

/**
 * Experimental Spec:
 *  search functions return "starts with" results (Array)
 *  find functions return "exact match" result (Object)
 */
export const searchProductByProductName = productNameStub => (
  dispatch,
  getState
) => {
  const productEntities = getState().product.productEntities

  return map(
    filter(getState().product.productIDsByProductName, (id, name) =>
      toLower(name).includes(toLower(productNameStub))
    ),
    id => productEntities[id]
  )
}

export const searchProducts = (query, lookupFunction) => dispatch => {
  dispatch(productAction.searchProducts())

  const matches = dispatch(lookupFunction(query))

  if (!matches || matches.length === 0) {
    dispatch(productAction.failSearchProducts(query))
    return
  }

  dispatch(productAction.succeedSearchProducts(matches))
}

export default {
  ...actions.product,
  searchProducts,
  searchProductByProductName,
  findProductByProductName,
  fetchProducts
}
