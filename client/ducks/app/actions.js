import { some, isUndefined, isNull } from 'lodash'
import { isWebUri } from 'valid-url'
import {
  APP_RESET,
  APP_INITIALIZE,
  APP_SET_API_ROOT,
  APP_SET_STORE_ID,
  API_ROOT_VALID,
  API_ROOT_INVALID
} from '../../constants/ActionTypes'
import { createActions } from 'redux-actions';
import { createIdentityActionMap } from '../../helpers/ducks'
debugger
const identityActions = createIdentityActionMap(
  APP_INITIALIZE,
  API_ROOT_VALID,
  API_ROOT_INVALID,
  APP_RESET
)
export default createActions({
  APP:{
    APP_SET_API_ROOT: apiRoot => ({ apiRoot }),
    APP_SET_STORE_ID: storeID => ({ storeID }),
    ...identityActions

}
}
   );
