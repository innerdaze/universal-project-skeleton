import actions from './actions'
import { errorOperations } from '../error'
import { networkOperations } from '../network'
import { sessionSelectors } from '../session'

const sessionAction = actions.session

export const login = (userID, password) => (dispatch, getState) => {
  debugger
  dispatch(sessionAction.requestLogin())
  if (sessionSelectors.requiresDomainSelector(getState())) {
    userID = sessionSelectors.domainSelector(getState())
      ? userID + sessionSelectors.domainSelector(getState())
      : userID
  }
  return dispatch(
    networkOperations.callApi({
      service: 'SystemLoginService.Login',
      skipSessionCheck: true,
      params: {
        UserID: userID,
        Password: password
      },
      success: json => {
        dispatch(sessionAction.receiveLogin())
        dispatch(sessionAction.startSession(json.result.Result.SessionID))
        dispatch(sessionAction.succeedLogin(json.result.Result.UserData))
      },
      error: error => {
        const message = error
          ? error.message
          : 'Could not login at this time. Please try again later or contact support'
        dispatch(sessionAction.failLogin(message))
        dispatch(errorOperations.displayError(message))
      }
    })
  )
}

export const logout = () => (dispatch, getState) => {
  dispatch(sessionAction.requestLogout())

  return dispatch(
    networkOperations.callApi({
      service: 'SystemLoginService.Logout',
      params: {
        SessionID: getState().session.session.id
      },
      success: () => {
        dispatch(sessionAction.receiveLogout())
        dispatch(sessionAction.endSession())
      }
    })
  )
}

export default {
  logout,
  login
}
