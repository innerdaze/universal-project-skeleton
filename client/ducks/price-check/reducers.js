import { handleActions } from 'redux-actions'
import actions from './actions'

const priceCheckActions = actions.priceCheck

const initialState = {
  error: null,
  isGettingPrice: false,
  isUpdatingPrice: false,
  lastPriceCheck: null,
  lastPriceUpdate: null,
  priceUpdateIntent: false
}

export default handleActions(
  {
    [priceCheckActions.requestGetPrice](state) {
      return {
        ...state,
        isGettingPrice: true
      }
    },
    [priceCheckActions.receiveGetPrice]: {
      next(state, { payload: { price } }) {
        return {
          ...state,
          isGettingPrice: false,
          lastPriceCheck: price,
          error: null
        }
      },
      throw(state, { payload: error }) {
        return {
          ...state,
          error
        }
      }
    },
    [priceCheckActions.requestUpdatePrice](state) {
      return {
        ...state,
        isUpdatingPrice: true
      }
    },
    [priceCheckActions.receiveUpdatePrice]: {
      next(state, { payload: { id, price } }) {
        return {
          ...state,
          isUpdatingPrice: false,
          lastPriceUpdate: { id, price },
          priceUpdateIntent: false,
          error: null
        }
      },
      throw(state, { payload: error }) {
        return {
          ...state,
          error
        }
      }
    },
    [priceCheckActions.setCurrentContext](
      state,
      { payload: { currentContext } }
    ) {
      return {
        ...state,
        currentContext
      }
    },
    [priceCheckActions.intendUpdatePrice](state) {
      return {
        ...state,
        priceUpdateIntent: true
      }
    }
  },
  initialState
)
