import { createActions } from 'redux-actions'
import { createIdentityActionMap } from '../../helpers/ducks'

export default createActions({
  WASTAGE: {
    ...createIdentityActionMap(
      'REQUEST_WASTAGE_TYPES',
      'REQUEST_PROCESS_WASTAGE',
      'RECEIVE_PROCESS_WASTAGE',
      'FINISH_CHANGING_WASTAGE_TYPE',
      'CANCEL_CHANGING_WASTAGE_TYPE'
    ),
    RECEIVE_WASTAGE_TYPES: models => ({ models }),
    ADD_WASTAGE: model => ({ model }),
    START_CHANGING_WASTAGE_TYPE: order => ({ order }),
    UPDATE_WASTAGE_TYPE_MAPPING: (id, typeId) => ({ id, typeId }),
    UPDATE_WASTAGE_QUANTITY: (id, quantity) => ({ id, quantity }),
    DELETE_WASTAGE: id => ({ id })
  }
})
