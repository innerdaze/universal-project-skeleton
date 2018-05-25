import { combineReducers } from 'redux'
import { handleActions } from 'redux-actions'
import actions from './actions'

const { session } = actions

const initialState = {
  id: '',
  alive: false,
  isRequesting: false,
  lastUpdated: null,
  error: null,
  requiresDomain: true,
  domain: '@domain.com'
}
const initialStateUser = {
  id: null,
  name: null
}
export const sessionReducer = handleActions(
  {
    [session.startSession](
      state,
      {
        payload: { id }
      }
    ) {
      return {
        ...state,
        id: id,
        alive: true
      }
    },
    [session.endSession](state) {
      return {
        ...state,
        id: null,
        alive: false
      }
    },
    [session.requestLogin](state) {
      return {
        ...state,
        isRequesting: true
      }
    },
    [session.receiveLogin](state) {
      return {
        ...state,
        isRequesting: false,
        lastUpdated: Date.now()
      }
    },
    [session.succeedLogin](state) {
      return {
        ...state,
        error: null
      }
    },
    [session.failLogin](state, { payload }) {
      return {
        ...state,
        error: payload
      }
    },
    [session.requestLogout](state) {
      return {
        ...state,
        isRequesting: true
      }
    },
    [session.receiveLogout](state) {
      return {
        ...state,
        isRequesting: false,
        lastUpdated: Date.now()
      }
    },
    [session.setDomain](
      state,
      {
        payload: { requiresDomain, domain }
      }
    ) {
      return {
        ...state,
        requiresDomain: requiresDomain,
        domain: domain
      }
    }
  },
  initialState
)

export const user = handleActions(
  {
    [session.succeedLogin](
      state,
      {
        payload: { user }
      }
    ) {
      return {
        ...state,
        id: user.UserID,
        name: user.UserName
      }
    },
    [session.receiveLogout](state) {
      return {
        ...state,
        id: null,
        name: null
      }
    }
  },
  initialState
)

export default combineReducers({
  session: sessionReducer,
  user
})
