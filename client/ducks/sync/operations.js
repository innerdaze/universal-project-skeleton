import actions from './actions'
import ProgressPromise from 'progress-promise'
import { barcodeOperations } from '../barcode'
import { productOperations } from '../product'
import { cashierOperations } from '../cashier'
import { sessionSelectors } from '../session'

const syncAction = actions.sync

const sync = () => {
  return async (dispatch, getState) => {
    dispatch(syncAction.startSync())

    const sessionID = getState().session.session.id

    await ProgressPromise.all([
      dispatch(barcodeOperations.fetchBarcodes(sessionID)),
      dispatch(productOperations.fetchProducts(sessionID)),
      dispatch(cashierOperations.fetchCashiers(sessionID))
    ]).progress(results =>
      dispatch(syncAction.syncProgress(results.proportion))
    )

    dispatch(syncAction.endSync())
  }
}

export default {
  sync
}
