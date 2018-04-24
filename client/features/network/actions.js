import { createActions } from 'redux-actions'
import { createIdentityActionMap } from '~/helpers/features'
const identityActions = createIdentityActionMap(
  'NET_FAIL_OFFLINE',
  'NET_FAIL_NO_SESSION'
)
export default createActions({
  NETWORK: {
    ...identityActions,
    SET_IS_OFFLINE: flag => ({ flag })
  }
})
