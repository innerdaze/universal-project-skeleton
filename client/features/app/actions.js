import { createActions } from 'redux-actions'
import { createIdentityActionMap } from '../../helpers/features'

const identityActions = createIdentityActionMap(
  'APP_INITIALIZE',
  'API_ROOT_VALIDATE', //Changed action name API_ROOT_VALID to API_ROOT_VALIDATE by KK on 15/03/2018 because of same name of action and property
  'API_ROOT_INVALID',
  'APP_RESET'
)

export default createActions({
  APP: {
    APP_SET_API_ROOT: apiRoot => ({ apiRoot }),
    APP_SET_STORE_ID: storeID => ({ storeID }),
    SET_ALLOW_PRICE_UPDATE: allowPriceUpdate => ({ allowPriceUpdate }),
    ...identityActions
  }
})
