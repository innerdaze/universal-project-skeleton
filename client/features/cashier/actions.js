import { createActions } from 'redux-actions'
import { createIdentityActionMap } from '../../helpers/ducks'

const identityActions = createIdentityActionMap(
  'REQUEST_CASHIERS',
  'INVALIDATE_CASHIERS',
  'LOGIN_CASHIER_AUTH',  //Name changed because of duplicate function name in operation files edited by KK on 16/03/2018
  'LOGOUT_CASHIER',
  'RESET_CASHIERS'
)

export default createActions({
  CASHIER: {
    RECEIVE_CASHIERS: json => ({ json }),
    SUCCEED_LOGIN_CASHIER: cashier => ({ cashier }),
    FAIL_LOGIN_CASHIER: error => ({ error }),
    ...identityActions
  }
})
