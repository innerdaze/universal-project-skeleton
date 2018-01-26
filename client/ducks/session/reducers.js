
import { combineReducers } from 'redux'
import { handleActions } from 'redux-actions'
import actions from './actions'
const { session } = actions
const initialState = {
  id: null,
  alive: false,
  isRequesting: false,
  lastUpdated: null,
  error: null
}
const initialStateUser = {
  id: null,
  name: null
}
const reducer1 = handleActions({
  [session.startSession] (state,{payload:{id}}) {
    return {
      ...state,
      id: id,
      alive: true
    }
  },
  [session.endSession] (state) {
    return {
      ...state,
      id: null,
      alive: false
    }
  },
  [session.requestLogin] (state) {
    return {
      ...state,
      isRequesting: true
    }
  },
  [session.receiveLogin] (state) {
    return {
      ...state,
      isRequesting: false,
      lastUpdated: Date.now()
    }
  },
  [session.succeedLogin] (state) {
    return {
      ...state,
      error: null
    }
  },
  [session.failLogin] (state,{payload}) {
    return {
      ...state,
      error: payload
    }
  },
  [session.requestLogout] (state) {
    return {
      ...state,
      isRequesting: true
    }
  },
  [session.receiveLogout] (state) {
    return {
      ...state,
      isRequesting: false,
      lastUpdated: Date.now()
    }
  }
}, initialState)

const reduceruser = handleActions({
  [session.succeedLogin] (state,{payload:{user}}) {
    return {
      ...state,
      id: user.UserID,
      name: user.UserName
    }
  },
  [session.receiveLogout] (state) {
    return {
      ...state,
      id: null,
      name: null
    }
  }
}, initialState)

const reducer=combineReducers(reducer1,reduceruser);
export default reducer;