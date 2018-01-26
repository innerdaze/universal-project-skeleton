import { createActions } from 'redux-actions';
import { createIdentityActionMap } from '../../helpers/ducks'
const identityActions = createIdentityActionMap(
  'APP_INITIALIZE',
  'API_ROOT_VALID',
  'API_ROOT_INVALID',
  'APP_RESET'
)
export default createActions({
  APP: {
    APP_SET_API_ROOT: apiRoot => ({ apiRoot }),
    APP_SET_STORE_ID: storeID => ({ storeID }),
    ...identityActions

  }
}
);
