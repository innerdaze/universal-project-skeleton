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
  debugger
const testAPIRoot=()=> {debugger
    return async dispatch => {
      return dispatch(networkOperations.callApi({
        service: 'GeneralService.GetTimeStamp',
        skipSessionCheck: true,
        method: 'post',
        success: () => dispatch(actions.setAPIRootValid()),
        error: error => {
          dispatch(errorOperations.displayError(error.message))
          dispatch(actions.setAPIRootInvalid())
        }
      }))
    }
  }
  const  appReset=()=>{
    return async dispatch => {
        return dispatch(APP_RESET)
      }  
  }

  /**
   * Validation is the responsibilty of the input mechanism
   */
 const setApiRoot=(apiRoot)=> {debugger
    return async (dispatch, getState) => {
      const fieldID = 'apiRoot'
      const error = 'Invalid URI'
  
      dispatch(actions.appSetApiRoot(apiRoot))
  
      if (dispatch(validateOperations.validate({
        fieldID,
        value: apiRoot,
        validation: async url => isWebUri(url),
        error
      }))) {
        await dispatch(testAPIRoot(apiRoot))
  
        if (getState().app.apiRootValid) {
          if (checkInitialised(getState())) {
            await dispatch(sessionOperations.login('apiuser', 'api.123'))
  
            if (getState().session.alive) {
              await dispatch(syncOperations.sync())
              return dispatch(initialize())
            } else {
              dispatch(actions.appSetApiRoot(null))
            }
          }
        } else {
          dispatch(actions.appSetApiRoot(null))
        }
      }
    }
  }
  const checkInitialised=(state)=> {debugger
    return !some(requiredConfigs, config => (
      isUndefined(state.app[config]) || isNull(state.app[config])
    ))
  }
  const reset=()=> {debugger
    return async dispatch => {
      dispatch(cashierOperations.resetCashiers())
      dispatch(productOperations.resetProducts())
      dispatch(barcodeOperations.resetBarcodes())
      await dispatch(cashierOperations.logoutCashier())
      dispatch(actions.appReset())
    }
  }

  export default {
    testAPIRoot,
    setApiRoot,
    checkInitialised,
    reset
  }