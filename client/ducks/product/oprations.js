import actions from './actions'
import { networkOperations } from '../network'
import { v4 as uuidGen } from 'uuid'
import { find, filter, includes, map } from 'lodash'
  debugger
  const fetchProducts=()=> {
    return dispatch => {
      dispatch(actions.requestProducts())
  
      return dispatch(networkOperations.callApi({
        service: 'HandheldService.GetProducts',
        params: {
          GetOptions: 0
        },
        success: json => dispatch(actions.receiveProducts(json.result.Result.ListOfProducts))
      }))
    }
  }

  const findProductByProductName=(productName) =>{
    return (dispatch, getState) => {
      const productID = getState().productIDsByProductName[productName]
      return productID && getState().productEntities[productID]
    }
  }

  /**
 * Experimental Spec:
 *  search functions return "starts with" results (Array)
 *  find functions return "exact match" result (Object)
 */
const searchProductByProductName=(productNameStub)=> {
  return (dispatch, getState) => {
    const productEntities = getState().productEntities

    return map(filter(getState().productIDsByProductName, (id, name) => (
      toLower(name).includes(toLower(productNameStub))
    )), id => productEntities[id])
  }
}
const searchProducts=(query, lookupFunction)=> {
  return dispatch => {
    dispatch(actions.startProductSearch())

    const matches = dispatch(lookupFunction(query))

    if (!matches || matches.length === 0) {
      dispatch(actions.failProductSearch(query))
      return
    }

    dispatch(actions.succeedProductSearch(matches))
  }
}
  export default {
    searchProducts,
    searchProductByProductName,
    findProductByProductName,
    fetchProducts
  }