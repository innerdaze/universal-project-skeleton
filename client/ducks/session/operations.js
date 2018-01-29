import actions from './actions'
import { errorOperations } from '../error'
import { networkOperations } from '../network'

  const login=(userID, password)=> {
    return dispatch => {
      dispatch(actions.requestLogin())
  
      return dispatch(networkOperations.callApi({
        service: 'SystemLoginService.Login',
        skipSessionCheck: true,
        params: {
          UserID: userID,
          Password: password
        },
        success: json => {
          dispatch(actions.receiveLogin())
          dispatch(actions.startSession(json.result.Result.SessionID))
          dispatch(actions.succeedLogin(json.result.Result.UserData))
        },
        error: error => {
          const message = error ? error.message : 'Could not login at this time. Please try again later or contact support'
          dispatch(actions.failLogin(message))
          dispatch(errorOperations.displayError(message))
        }
      }))
    }
  }
  
  const logout=()=> {
    return (dispatch, getState) => {
      dispatch(actions.requestLogout())
  
      return dispatch(networkOperations.callApi({
        service: 'SystemLoginService.Logout',
        params: {
          SessionID: getState().session.id
        },
        success: () => {
          dispatch(actions.receiveLogout())
          dispatch(actions.endSession())
        }
      }))
    }
  }
  export default {
    logout,login
  }