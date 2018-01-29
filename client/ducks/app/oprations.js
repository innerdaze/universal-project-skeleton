import actions from './actions'
import { some, isUndefined, isNull } from 'lodash'
import { isWebUri } from 'valid-url'
import { syncOperations } from '../sync'
import { sessionOperations } from '../session'
import { validateOperations } from '../validation'
import { networkOperations } from '../network'
import { errorOperations } from '../error'
import { cashierOperations} from '../cashier'
import { barcodeOperations } from '../barcode'
import { productOperations } from '../product'
const requiredConfigs = [
    'apiRoot'
  ]
const testAPIRoot=()=> {
    return async dispatch => {
      return dispatch(networkOperations.network.callApi({
        service: 'GeneralService.GetTimeStamp',
        skipSessionCheck: true,
        method: 'post',
        success: () => dispatch(actions.app.setAPIRootValid()),
        error: error => {
          dispatch(errorOperations.error.displayError(error.message))
          dispatch(actions.app.setAPIRootInvalid())
        }
      }))
    }
  }
  const  appReset=()=>{
    return async dispatch => {
        return dispatch(appReset())
      }  
  }

  /**
   * Validation is the responsibilty of the input mechanism
   */
 const setApiRoot=(apiRoot)=> {
    return async (dispatch, getState) => {
      const fieldID = 'apiRoot'
      const error = 'Invalid URI'
  
      dispatch(actions.app.appSetApiRoot(apiRoot))
  
      if (dispatch(validateOperations.validate.validate({
        fieldID,
        value: apiRoot,
        validation: async url => isWebUri(url),
        error
      }))) {
        await dispatch(testAPIRoot(apiRoot))
  
        if (getState().app.apiRootValid) {
          if (checkInitialised(getState())) {
            await dispatch(sessionOperations.session.login('apiuser', 'api.123'))
  
            if (getState().session.alive) {
              await dispatch(syncOperations.sync.sync())
              return dispatch(actions.app.appInitialize())
            } else {
              dispatch(actions.app.appSetApiRoot(null))
            }
          }
        } else {
          dispatch(actions.app.appSetApiRoot(null))
        }
      }
    }
  }
 const setStoreID=(storeID) => {
  return async dispatch => {
  dispatch(actions.app.appSetStoreId(storeID))
  }
  }
  const checkInitialised=(state)=> {
    return !some(requiredConfigs, config => (
      isUndefined(state.app[config]) || isNull(state.app[config])
    ))
  }
  const reset=()=> {
    return async dispatch => {
      dispatch(cashierOperations.cashier.resetCashiers())
      dispatch(productOperations.product.resetProducts())
      dispatch(barcodeOperations.barcode.resetBarcodes())
      await dispatch(cashierOperations.cashier.logoutCashier())
      dispatch(actions.app.appReset())
    }
  }

  export default {
    testAPIRoot,
    setApiRoot,
    checkInitialised,
    reset,
    setStoreID
  }