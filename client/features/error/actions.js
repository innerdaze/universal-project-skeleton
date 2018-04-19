import { createActions } from 'redux-actions'
import { createIdentityActionMap } from '~/helpers/features'
const identityActions = createIdentityActionMap(
  'DISMISS_ERROR',
  'DISMISS_OFFLINE_FLAG',
  'SET_OFFLINE_FLAG'
)
export default createActions({
  ERROR: {
    DISPLAY_ERROR: error => ({ error }),
    ...identityActions
  }
})
