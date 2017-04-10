import test from 'ava'
import { receiveBarcodes } from '../../../client/actions/BarcodeActions'
import { RECEIVE_BARCODES } from '../../../client/constants/ActionTypes'

test('create an action to receive all barcodes', t => {
  const actualAction = receiveBarcodes()

  t.is(actualAction.type, RECEIVE_BARCODES)
  t.is(actualAction.barcodes, undefined)
  t.is(typeof actualAction.receivedAt, 'number')
})
