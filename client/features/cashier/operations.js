import actions from './actions'
import { networkOperations } from '../network'
import { errorOperations } from '../error'

const cashierAction = actions.cashier

const fetchCashiers = () => {
  return dispatch => {
    dispatch(cashierAction.requestCashiers())

    return dispatch(
      networkOperations.callApi({
        service: 'CashierService.GetCashiers',
        params: {
          StoreID: 0
        },
        success: json =>
          dispatch(
            cashierAction.receiveCashiers(json.result.Result.ListOfCashiers)
          )
      })
    )
  }
}

const loginCashier = (id, password) => {
  return (dispatch, getState) => {
    dispatch(cashierAction.loginCashier())

    const error = 'Username or password not found'

    const cashier = getState().cashier.cashierEntities[id]

    if (!cashier) {
      dispatch(cashierAction.failLoginCashier(error))
      dispatch(errorOperations.displayError(error))
      return
    }

    if (cashier.CashierPassword !== password) {
      dispatch(cashierAction.failLoginCashier(error))
      dispatch(errorOperations.displayError(error))
      return
    }
    dispatch(errorOperations.dismissError())
    dispatch(cashierAction.succeedLoginCashier(cashier))
  }
}

export default {
  ...actions.cashier,
  loginCashier,
  fetchCashiers
}
