import { createActions } from 'redux-actions'
import { createIdentityActionMap } from '~/helpers/features'

const identityActions = createIdentityActionMap(
  'CANCEL_DELETING_ORDER',
  'START_DELETING_ORDER',
  'FINISH_CHANGING_ORDER_QUANTITY',
  'CANCEL_CHANGING_ORDER_QUANTITY',
  'REQUEST_PROCESS_ORDERS',
  'RECEIVE_PROCESS_ORDERS',
  'DISCARD_PENDING_TRANSACTION',
  'CONFIRM_START_MODIFY_TRANSACTION',
  'CANCEL_START_MODIFY_TRANSACTION'
)

export default createActions({
  ORDER: {
    ADD_ORDER: (id, order) => ({ id, order }),
    DELETE_ORDER: id => ({ id }),
    CHANGE_ORDER_QUANTITY: (id, quantity) => ({ id, quantity }),
    SUCCEED_PROCESS_ORDERS: orderIDs => ({ orderIDs }),
    FAIL_PROCESS_ORDERS: error => ({ error }),
    CHANGE_OPERATION_MODE: mode => ({ mode }),
    CREATE_PENDING_TRANSACTION: transaction => ({ transaction }),
    START_CHANGING_ORDER_QUANTITY: order => ({ order }),
    PROMPT_START_MODIFY_TRANSACTION: transaction => ({ transaction }),
    CHANGE_PENDING_TRANSACTION_QUANTITY: quantity => ({ quantity }),
    ...identityActions
  }
})
