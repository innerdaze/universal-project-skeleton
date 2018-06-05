import actions from './actions'
import { errorOperations } from '../error'
import { networkOperations } from '../network'
import { sessionSelectors } from '../session'

const sessionAction = actions.session

export const login = (userID, password) => (dispatch, getState) => {
  dispatch(sessionAction.requestLogin())

  const state = getState()

  if (sessionSelectors.requiresDomainSelector(state)) {
    const domain = sessionSelectors.domainSelector(state)

    if (domain) {
      userID = `${userID}@${domain}`
    }
  }

  return dispatch(
    networkOperations.callApi({
      service: 'SystemLoginService.Login',
      skipSessionCheck: true,
      params: {
        UserID: userID,
        Password: password
      }
    })
  )
    .then(json => {
      dispatch(sessionAction.receiveLogin())
      dispatch(sessionAction.startSession(json.result.Result.SessionID))
      dispatch(sessionAction.succeedLogin(json.result.Result.UserData))
    })
    .catch(
      (
        error = Error(
          'Could not login at this time. Please try again later or contact support'
        )
      ) => {
        dispatch(sessionAction.failLogin(error.message))
        throw error
      }
    )
}

export const logout = () => (dispatch, getState) => {
  dispatch(sessionAction.requestLogout())

  return dispatch(
    networkOperations.callApi({
      service: 'SystemLoginService.Logout',
      params: {
        SessionID: sessionSelectors.id(getState())
      }
    })
  ).then(() => {
    dispatch(sessionAction.receiveLogout())
    dispatch(sessionAction.endSession())
  })
}

const { setDomain } = actions.session

export default {
  setDomain,
  logout,
  login
}
