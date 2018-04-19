import { pluck } from 'ramda'
import { callApi } from '~features/network/operations'
import { orderOperations, orderSelectors } from '~features/order'
import actions from './actions'
import selectors from './selectors'
import { barcodeOperations } from '~features/barcode'
import { find, filter, includes, map } from 'lodash'
import { v4 as uuidGen } from 'uuid'
const wastageActions = actions.wastage

export const fetchWastageTypes = () => dispatch => {
  dispatch(wastageActions.requestWastageTypes())

  return dispatch(
    callApi({
      service: 'WastageService.GetWastageTypes',
      success(data) {
        dispatch(
          wastageActions.receiveWastageTypes(
            data.result.Result.ListOfWastageTypes
          )
        )
      },
      failure(error) {
        dispatch(wastageActions.receiveWastageTypes(error))
      }
    })
  )
}

export const processWastage = () => (dispatch, getState) => {
  dispatch(wastageActions.requestProcessWastage())

  const wastageEntities = selectors.wastageEntitiesListSelector(getState())

  return dispatch(
    callApi({
      service: 'WastageService.ProcessWastage',
      params: {
        ListOfWastageLines: wastageEntities
      },
      success(data) {
        dispatch(wastageActions.receiveProcessWastage())
        dispatch(orderOperations.receiveProcessOrders())
        dispatch(
          orderOperations.succeedProcessOrders(pluck('_id', wastageEntities))
        )
      },
      failure(error) {
        dispatch(wastageActions.receiveProcessWastage(error))
        dispatch(orderOperations.receiveProcessOrders())
        dispatch(orderOperations.failProcessOrders(error))
      }
    })
  )
}
export default {
  ...actions.wastage,
  fetchWastageTypes,
  processWastage
}
