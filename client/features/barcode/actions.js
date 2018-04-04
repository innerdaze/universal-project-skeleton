import { createActions } from 'redux-actions'
import { createIdentityActionMap } from '~/helpers/features'

const identityActions = createIdentityActionMap(
  'REQUEST_BARCODES',
  'INVALIDATE_BARCODES',
  'RESET_BARCODES'
)

export default createActions({
  BARCODE: {
    RECEIVE_BARCODES: json => ({ json }),
    LOOKUP_BARCODE: barcodeID => ({ barcodeID }),
    SUCCEED_LOOKUP_BARCODE: barcodeID => ({ barcodeID }),
    FAIL_LOOKUP_BARCODE: barcodeID => ({ barcodeID }),
    ...identityActions
  }
})
