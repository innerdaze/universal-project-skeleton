import { createActions } from 'redux-actions'
import { createIdentityActionMap } from '~/helpers/features'
const identityActions = createIdentityActionMap('DISMISS_ERROR')
export default createActions({
  ERROR: {
    DISPLAY_ERROR: error => ({ error }),
    ...identityActions
  }
})
