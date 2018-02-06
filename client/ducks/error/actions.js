import { createActions } from 'redux-actions';
import { createIdentityActionMap } from '../../helpers/ducks'
const identityActions = createIdentityActionMap(
  'DISMISS_ERROR'
)
export default createActions({
  ERROR: {
    DISPLAY_ERROR: error => ({ error }),
    ...identityActions
  }
}
);
