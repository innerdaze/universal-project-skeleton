import { createActions } from 'redux-actions'
import { createIdentityActionMap } from '../../helpers/ducks'
const identityActions = createIdentityActionMap(
  'NET_FAIL_OFFLINE',
  'NET_FAIL_NO_SESSION'
)
debugger
export default createActions({
  NETWORK: {...identityActions}
}
)
