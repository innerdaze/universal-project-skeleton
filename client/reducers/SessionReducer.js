export function session(state = {
  id: null,
  alive: true,
  isRequesting: false,
  lastUpdated: null,
  error: null
}, action) {
  switch (action.type) {
    case 'START_SESSION':
      return {
        ...state,
        id: action.id,
        alive: true
      }
    case 'END_SESSION':
      return {
        ...state,
        id: null,
        alive: false
      }
    case 'REQUEST_LOGIN':
      return {
        ...state,
        isRequesting: true
      }
    case 'RECEIVE_LOGIN':
      return {
        ...state,
        isRequesting: false,
        lastUpdated: action.receivedAt
      }
    case 'SUCCEED_LOGIN':
      return {
        ...state,
        error: null
      }
    case 'FAIL_LOGIN':
      return {
        ...state,
        error: action.error
      }
    case 'REQUEST_LOGOUT':
      return {
        ...state,
        isRequesting: true
      }
    case 'RECEIVE_LOGOUT':
      return {
        ...state,
        isRequesting: false,
        lastUpdated: action.receivedAt
      }
    default:
      return state
  }
}

export function user(state = {
  id: null,
  name: null
}, action) {
  switch (action.type) {
    case 'SUCCEED_LOGIN':
      return {
        id: action.user.UserID,
        name: action.user.UserName
      }
    case 'RECEIVE_LOGOUT':
      return {
        id: null,
        name: null
      }
    default:
      return state
  }
}
