import { createActions } from 'redux-actions';
import {
  REQUEST_CASHIERS,
  RECEIVE_CASHIERS,
  INVALIDATE_CASHIERS,
  RESET_CASHIERS,
  LOGIN_CASHIER,
  LOGOUT_CASHIER,
  SUCCEED_LOGIN_CASHIER,
  FAIL_LOGIN_CASHIER
} from '../../constants/ActionTypes'
const identityActions = createIdentityActionMap(
  REQUEST_CASHIERS,
  INVALIDATE_CASHIERS,
  LOGIN_CASHIER,
  LOGOUT_CASHIER,
  RESET_CASHIERS
)
export default createActions({
  CASHIER: {
    RECEIVE_CASHIERS:json=>json,
    SUCCEED_LOGIN_CASHIER:cashier=>cashier,
    FAIL_LOGIN_CASHIER:error=>error,
    ...identityActions
  }
}
);
