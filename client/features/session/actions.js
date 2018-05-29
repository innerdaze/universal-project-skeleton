import { createActions } from 'redux-actions'
import { createIdentityActionMap } from '~/helpers/features'

const identityActions = createIdentityActionMap(
  'REQUEST_LOGIN',
  'RECEIVE_LOGIN',
  'REQUEST_LOGOUT',
  'RECEIVE_LOGOUT',
  'END_SESSION'
)

export default createActions({
  SESSION: {
    START_SESSION: id => ({ id }),
    SUCCEED_LOGIN: user => ({ user }),
    FAIL_LOGIN: error => ({ error }),
    SET_DOMAIN_FLAG: requiresDomain => ({ requiresDomain }),
    SET_DOMAIN_KEY:  domain => ({ domain }),
    ...identityActions
  }
})
