import test from 'ava'
import { requestBarcodes } from '../../../actions/BarcodeActions'
import { REQUEST_BARCODES } from '../../../constants/ActionTypes'

test('create an action to request all barcodes', t => {
  const expectedAction = {
    type: REQUEST_BARCODES
  }

  t.deepEqual(requestBarcodes(), expectedAction)
})
