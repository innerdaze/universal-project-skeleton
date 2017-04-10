import test from 'ava'
import { invalidateBarcodes } from '../../../client/actions/BarcodeActions'
import { INVALIDATE_BARCODES } from '../../../client/constants/ActionTypes'

test('create an action to invalidate all barcodes', t => {
  const expectedAction = {
    type: INVALIDATE_BARCODES
  }

  t.deepEqual(invalidateBarcodes(), expectedAction)
})
