import actions from './actions'
import { networkOperations } from '../network'
import { v4 as uuidGen } from 'uuid'
import { find, filter, includes, map , toLower } from 'lodash'
const productAction = actions.product
const fetchProducts = () => {
  return dispatch => {
    dispatch(productAction.requestProducts())

    return dispatch(networkOperations.callApi({
      service: 'HandheldService.GetProducts',
      params: {
        GetOptions: 0
      },
      success: json => dispatch(productAction.receiveProducts(json.result.Result.ListOfProducts))
    }))
  }
}

const findProductByProductName = (productName) => {
  return (dispatch, getState) => {
    const productID = getState().product.productIDsByProductName[productName]
    return productID && getState().product.productEntities[productID]
  }
}

/**
* Experimental Spec:
*  search functions return "starts with" results (Array)
*  find functions return "exact match" result (Object)
*/
const searchProductByProductName = (productNameStub) => {
  return (dispatch, getState) => {
    const productEntities = getState().product.productEntities

    return map(filter(getState().product.productIDsByProductName, (id, name) => (
      toLower(name).includes(toLower(productNameStub))
    )), id => productEntities[id])
  }
}
const searchProducts = (query, lookupFunction) => {
  return dispatch => {
    dispatch(productAction.searchProducts())

    const matches = dispatch(lookupFunction(query))

    if (!matches || matches.length === 0) {
      dispatch(productAction.failSearchProducts(query))
      return
    }

    dispatch(productAction.succeedSearchProducts(matches))
  }
}
export default {
  ...actions.product,
  searchProducts,
  searchProductByProductName,
  findProductByProductName,
  fetchProducts
}