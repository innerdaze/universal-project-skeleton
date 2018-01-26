import { createActions } from 'redux-actions';
import { createIdentityActionMap } from '../../helpers/ducks'
export default createActions({
  NETWORK: createIdentityActionMap(
    'NET_FAIL_OFFLINE',
    'NET_FAIL_NO_SESSION'
 )
}
);
