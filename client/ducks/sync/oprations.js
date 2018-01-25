import actions from './actions'
import ProgressPromise from 'progress-promise'
import { barcodeOperations } from '../barcode'
import { productOperations } from '../product'
import {cashierOperations} from '../cashier'
  debugger

  const sync=()=> {
    return async (dispatch, getState) => {
      dispatch(actions.startSync())
  
      const sessionID = getState().session.id
  
      await ProgressPromise.all([
        dispatch(barcodeOperations.fetchBarcodes(sessionID)),
        dispatch(productOperations.fetchProducts(sessionID)),
        dispatch(cashierOperations.fetchCashiers(sessionID))
      ]).progress(results => dispatch(actions.syncProgress(results.proportion)))
  
      dispatch(actions.endSync())
    }
  }
  
  export default {
    sync
  }