import { createActions } from 'redux-actions';
import {
  REQUEST_LOGIN,
  RECEIVE_LOGIN,
  REQUEST_LOGOUT,
  RECEIVE_LOGOUT,
  START_SESSION,
  END_SESSION,
  SUCCEED_LOGIN,
  FAIL_LOGIN
} from '../../constants/ActionTypes'
const identityActions = createIdentityActionMap(
  REQUEST_LOGIN,
  RECEIVE_LOGIN,
  REQUEST_LOGOUT,
  RECEIVE_LOGOUT,
  END_SESSION
)
export default createActions({
  CASHIER: {
    START_SESSION:is=>id,
    SUCCEED_LOGIN:user=>user,
    FAIL_LOGIN:error=>error,
    ...identityActions
  }
}
);
