import actions from './actions'
import { some, isUndefined, isNull } from 'lodash'
import { isWebUri } from 'valid-url'
import { sync } from '../../actions/SyncActions'
import { login } from '../../actions/SessionActions'
import { validate } from '../../actions/ValidationActions'
import { callApi } from '../../actions/NetworkActions'
import { displayError } from '../../actions/ErrorActions'
import { resetCashiers, logoutCashier } from '../../actions/CashierActions'
import { resetBarcodes } from '../../actions/BarcodeActions'
import { resetProducts } from '../../actions/ProductActions'
const requiredConfigs = [
    'apiRoot'
  ]
  debugger
const testAPIRoot=()=> {debugger
    return async dispatch => {
      return dispatch(callApi({
        service: 'GeneralService.GetTimeStamp',
        skipSessionCheck: true,
        method: 'post',
        success: () => dispatch(actions.setAPIRootValid()),
        error: error => {
          dispatch(displayError(error.message))
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
  
      if (dispatch(validate({
        fieldID,
        value: apiRoot,
        validation: async url => isWebUri(url),
        error
      }))) {
        await dispatch(testAPIRoot(apiRoot))
  
        if (getState().app.apiRootValid) {
          if (checkInitialised(getState())) {
            await dispatch(login('apiuser', 'api.123'))
  
            if (getState().session.alive) {
              await dispatch(sync())
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
  function checkInitialised(state) {debugger
    return !some(requiredConfigs, config => (
      isUndefined(state.app[config]) || isNull(state.app[config])
    ))
  }
  const reset=()=> {debugger
    return async dispatch => {
      dispatch(resetCashiers())
      dispatch(resetProducts())
      dispatch(resetBarcodes())
      await dispatch(logoutCashier())
      dispatch(actions.appReset())
    }
  }

  export default {
    testAPIRoot,
    setApiRoot,
    checkInitialised,
    reset
  }