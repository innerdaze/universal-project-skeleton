import { createActions } from 'redux-actions';
import {
  START_SYNC,
  END_SYNC,
  SYNC_PROGRESS
} from '../../constants/ActionTypes'
const identityActions = createIdentityActionMap(
  START_SYNC,
  END_SYNC
)
export default createActions({
  SYNC: {
    SYNC_PROGRESS:progress=>progress,
    ...identityActions
  }
}
);
