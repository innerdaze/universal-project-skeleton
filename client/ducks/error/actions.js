import { createActions } from 'redux-actions';
import {
  ERROR_DISPLAY,
  ERROR_DISMISS
} from '../../constants/ActionTypes'
const identityActions = createIdentityActionMap(
  ERROR_DISMISS
)
export default createActions({
  ERROR: {
    ERROR_DISPLAY:error=>error,
    ...identityActions
  }
}
);
