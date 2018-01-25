import actions from './actions'
import { networkOperations } from '../network'
import { errorOperations } from '../error'
  debugger
const fetchCashiers=() =>{
  return dispatch => {
    dispatch(requestCashiers())

    return dispatch(networkOperations.callApi({
      service: 'CashierService.GetCashiers',
      params: {
        StoreID: 0
      },
      success: json => dispatch(actions.receiveCashiers(json.result.Result.ListOfCashiers))
    }))
  }
}
//login varify
  const loginCashier=(id, password)=> {
    return (dispatch, getState) => {
      dispatch(actions.loginCashier())
  
      const error = `Username or password not found`
  
      const cashier = getState().cashierEntities[id]
  
      if (!cashier) {
        dispatch(actions.failLoginCashier(error))
        dispatch(errorOperations.displayError(error))
        return
      }
  
      if (cashier.CashierPassword !== password) {
        dispatch(actions.failLoginCashier(error))
        dispatch(errorOperations.displayError(error))
        return
      }
  
      dispatch(errorOperations.dismissError())
      dispatch(actions.succeedLoginCashier(cashier))
    }
  }
  //logout user
  const logoutCashier=() =>{
   dispatch(actions.logoutCashier());
  }
  export default {
    loginCashier,
    fetchCashiers,
    logoutCashier
  }