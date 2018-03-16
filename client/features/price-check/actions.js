import { createActions } from 'redux-actions'
import { createIdentityActionMap } from '../../helpers/features'

export default createActions({
  PRICE_CHECK: {
    ...createIdentityActionMap(
      'REQUEST_GET_PRICE',
      'REQUEST_UPDATE_PRICE',
      'INTEND_UPDATE_PRICE'
    ),
    RECEIVE_UPDATE_PRICE: (id, price) => ({ id, price }),
    RECEIVE_GET_PRICE: price => ({ price }),
    SET_CURRENT_CONTEXT: currentContext => ({ currentContext })
  }
})
