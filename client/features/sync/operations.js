import actions from './actions'
// import ProgressPromise from 'progress-promise'
import ProgressPromise from '../../helpers/ProgressPromise'
import { barcodeOperations } from '../barcode'
import { productOperations } from '../product'
import { cashierOperations } from '../cashier'
import { sessionSelectors } from '../session'
import { wastageOperations } from '../wastage'

const syncAction = actions.sync

const sync = () => (dispatch, getState) => {
  dispatch(syncAction.startSync())

  const sessionID = sessionSelectors.id(getState())

  return ProgressPromise.all(
    [
      dispatch(barcodeOperations.fetchBarcodes(sessionID)),
      dispatch(productOperations.fetchProducts(sessionID)),
      dispatch(cashierOperations.fetchCashiers(sessionID)),
      dispatch(wastageOperations.fetchWastageTypes(sessionID))
    ],
    proportion => dispatch(syncAction.syncProgress(proportion))
  ).then(() => dispatch(syncAction.endSync()))
}

export default {
  sync
}
