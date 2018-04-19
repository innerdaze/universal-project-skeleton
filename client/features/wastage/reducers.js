import { handleActions } from 'redux-actions'
import { combineReducers } from 'redux'
import { pluck, indexBy, prop, assocPath, without, of, dissoc } from 'ramda'
import actions from './actions'

const { wastage } = actions

const wastageTypesInitialState = {
  isFetching: false,
  didInvalidate: false,
  allIds: [],
  byId: {},
  lastUpdated: null,
  error: null
}

export const wastageTypes = handleActions(
  {
    [wastage.requestWastageTypes](state) {
      return {
        ...state,
        isFetching: true
      }
    },
    [wastage.receiveWastageTypes]: {
      next(
        state,
        {
          payload: { models }
        }
      ) {
        return {
          ...state,
          isFetching: false,
          didInvalidate: false,
          allIds: pluck('TypeID', models),
          byId: indexBy(prop('TypeID'), models),
          error: null
        }
      },
      throw(state, { payload: error }) {
        return { ...state, isFetching: false, error }
      }
    }
  },
  wastageTypesInitialState
)

const wastageProcessingInitialState = {
  isChangingWastageType: false,
  changingWastageTypeFor: null,
  isProcessing: false,
  error: null
}

export const wastageProcessing = handleActions(
  {
    [wastage.requestProcessWastage](state) {
      return {
        ...state,
        isProcessing: true
      }
    },
    [wastage.receiveProcessWastage]: {
      next(state) {
        return {
          ...state,
          isProcessing: false,
          error: null
        }
      },
      throw(state, { payload: error }) {
        return {
          ...state,
          isProcessing: false,
          error
        }
      }
    }
  },
  wastageProcessingInitialState
)

const wastageEntitiesInitialState = {
  isChangingWastageType: false,
  changingWastageTypeFor: null
}

export const wastageEntities = handleActions(
  {
    [wastage.startChangingWastageType](
      state,
      {
        payload: { order }
      }
    ) {
      return {
        ...state,
        isChangingWastageType: true,
        changingWastageTypeFor: order
      }
    },
    [wastage.finishChangingWastageType](state) {
      return {
        ...state,
        isChangingWastageType: false,
        changingWastageTypeFor: null
      }
    },
    [wastage.cancelChangingWastageType](state) {
      return {
        ...state,
        isChangingWastageType: false,
        changingWastageTypeFor: null
      }
    }
  },
  wastageEntitiesInitialState
)

export const wastageTypeToOrderMap = handleActions(
  {
    [wastage.updateWastageTypeMapping](
      state,
      {
        payload: { id, typeId }
      }
    ) {
      return {
        ...state,
        [id]: typeId
      }
    }
  },
  {}
)

export default combineReducers({
  wastageTypes,
  wastageProcessing,
  wastageEntities,
  wastageTypeToOrderMap
})
