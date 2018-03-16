import { createActions } from 'redux-actions'
import { createIdentityActionMap } from '../../helpers/features'
const identityActions = createIdentityActionMap('START_SYNC', 'END_SYNC')
export default createActions({
  SYNC: {
    SYNC_PROGRESS: progress => ({ progress }),
    ...identityActions
  }
})
