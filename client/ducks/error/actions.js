import { createActions } from 'redux-actions';
import { createIdentityActionMap } from '../../helpers/ducks'
const identityActions = createIdentityActionMap(
  'ERROR_DISMISS'
)
export default createActions({
  ERROR: {
    ERROR_DISPLAY: error => ({ error }),
    ...identityActions
  }
}
);
