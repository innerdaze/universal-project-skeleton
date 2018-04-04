import { combineReducers } from 'redux'
import { handleActions } from 'redux-actions'
import actions from './actions'

const { app } = actions

const initialState = {
  isInitialized: true,
  apiRoot: null,
  apiRootValid: false,
  storeID: '0',
  allowPriceUpdate: false
}

const reducer = handleActions(
  {
    [app.appInitialize](state) {
      return {
        ...state,
        isInitialized: true
      }
    },
    [app.appSetApiRoot](state, { payload: { apiRoot } }) {
      return {
        ...state,
        apiRoot
      }
    },
    [app.appSetStoreId](state, { payload: { storeID } }) {
      return {
        ...state,
        storeID
      }
    },
    [app.apiRootValidate](state) {
      //Changed action name API_ROOT_VALID to API_ROOT_VALIDATE by KK on 15/03/2018 because of same name of action and property
      return {
        ...state,
        apiRootValid: true
      }
    },
    [app.apiRootInvalid](state) {
      return {
        ...state,
        apiRootValid: false
      }
    },
    [app.appReset](state) {
      return {
        ...state,
        apiRoot: null,
        isInitialized: false,
        apiRootValid: false,
        allowPriceUpdate: false
      }
    },
    [app.setAllowPriceUpdate](state, { payload: { allowPriceUpdate } }) {
      return {
        ...state,
        allowPriceUpdate
      }
    }
  },
  initialState
)

export default reducer
