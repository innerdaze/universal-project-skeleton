import { createActions } from 'redux-actions';
import {
  REQUEST_BARCODES,
  RECEIVE_BARCODES,
  INVALIDATE_BARCODES,
  RESET_BARCODES,
  LOOKUP_BARCODE,
  SUCCEED_LOOKUP_BARCODE,
  FAIL_LOOKUP_BARCODE
} from '../constants/ActionTypes'

const identityActions = createIdentityActionMap(
  REQUEST_BARCODES,
  INVALIDATE_BARCODES,
  RESET_BARCODES
)
export default createActions({
  BARCODE: {
    RECEIVE_BARCODES:json=>json,
    LOOKUP_BARCODE: barcodeID => barcodeID,
    SUCCEED_LOOKUP_BARCODE:barcodeID=>barcodeID,
    FAIL_LOOKUP_BARCODE:barcodeID=>barcodeID,
    ...identityActions

  }
}
);
