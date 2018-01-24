import ProgressPromise from 'progress-promise'
import {
  START_SYNC,
  END_SYNC,
  SYNC_PROGRESS
} from '../constants/ActionTypes'
import { fetchBarcodes } from './BarcodeActions'
import { fetchProducts } from './ProductActions'
//import { fetchCashiers } from './CashierActions'
import {cashierOperations} from '../ducks/cashier'
export function startSync() {
  return {
    type: START_SYNC
  }
}

export function endSync() {
  return {
    type: END_SYNC
  }
}

export function syncProgress(progress) {
  return {
    type: SYNC_PROGRESS,
    progress
  }
}

export function sync() {
  return async (dispatch, getState) => {
    dispatch(startSync())

    const sessionID = getState().session.id

    await ProgressPromise.all([
      dispatch(fetchBarcodes(sessionID)),
      dispatch(fetchProducts(sessionID)),
      dispatch(cashierOperations.fetchCashiers(sessionID))
    ]).progress(results => dispatch(syncProgress(results.proportion)))

    dispatch(endSync())
  }
}
