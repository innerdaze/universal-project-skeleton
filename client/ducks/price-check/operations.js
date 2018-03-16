import { callApi } from '~features/network/operations'
import actions from './actions'

const priceCheckActions = actions.priceCheck

export const getPrice = ({ productId, barcode }) => dispatch => {
  dispatch(priceCheckActions.requestGetPrice())

  const currentContext = {
    type: productId ? 'product' : 'barcode',
    value: productId || barcode
  }

  dispatch(
    callApi({
      service: 'HandheldService.GetPrice',
      params: barcode ? { Barcode: barcode } : { ProductID: productId },
      success(data) {
        dispatch(
          priceCheckActions.receiveGetPrice(data.result.Result.ProductPrice)
        )
        dispatch(priceCheckActions.setCurrentContext(currentContext))
      },
      failure(error) {
        dispatch(priceCheckActions.receiveGetPrice(error))
      }
    })
  )
}

export const updatePrice = ({ productId, barcode, price }) => dispatch => {
  dispatch(priceCheckActions.requestUpdatePrice())

  dispatch(
    callApi({
      service: 'HandheldService.UpdatePrice',
      params: {
        [productId ? 'ProductID' : 'Barcode']: productId || barcode,
        NewPrice: price
      },
      success(data) {
        dispatch(
          priceCheckActions.receiveUpdatePrice(productId || barcode, price)
        )
        dispatch(
          getPrice({
            [productId ? 'productId' : 'barcode']: productId || barcode
          })
        )
      },
      failure(error) {
        dispatch(priceCheckActions.receiveUpdatePrice(error))
      }
    })
  )
}

export default {
  ...actions.priceCheck,
  getPrice,
  updatePrice
}
