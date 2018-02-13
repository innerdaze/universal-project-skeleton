import { combineReducers } from 'redux'
import { handleActions } from 'redux-actions'
import actions from './actions'
import { keyBy, difference, fromPairs, map } from 'lodash'

const { product } = actions

const initialStateProduct = {
  isFetching: false,
  didInvalidate: false,
  lastUpdated: null,
  items: []
}
const initialStateProductSearch = {
  isSearching: false,
  lastError: null,
  lastMatches: []
}
const intialStateProductEntities = {}
const intialStateProductIDsByProductName = {}

const products = handleActions(
  {
    [product.invalidateProducts](state) {
      return {
        ...state,
        didInvalidate: true
      }
    },
    [product.requestProducts](state) {
      return {
        ...state,
        isFetching: true,
        didInvalidate: false
      }
    },
    [product.receiveProducts](state, { payload: { json } }) {
      return {
        ...state,
        isFetching: false,
        didInvalidate: false,
        items: map(json.filter(item => !item.Deleted), 'ProductID'),
        lastUpdated: Date.now()
      }
    },
    [product.resetProducts](state) {
      return {
        ...state,
        items: []
      }
    }
  },
  initialStateProduct
)

const productSearch = handleActions(
  {
    [product.searchProducts](state) {
      return {
        ...state,
        isSearching: true
      }
    },
    [product.succeedSearchProducts](state, { payload: { matches } }) {
      return {
        ...state,
        isSearching: false,
        lastMatches: matches
      }
    },
    [product.failSearchProducts](state, { payload: { query } }) {
      return {
        ...state,
        isSearching: false,
        lastError: `No match for: ${query}`
      }
    }
  },
  initialStateProductSearch
)

const productEntities = handleActions(
  {
    [product.receiveProducts](state, { payload:{json} }) {debugger
      return keyBy(json, 'ProductID')
    },
    [product.resetProducts](state) {
      return {}
    }
  },
  intialStateProductEntities
)

const productIDsByProductName = handleActions(
  {
    [product.receiveProducts](state, { payload:{json} }) {
      return fromPairs(
        map(json, product => [product.ProductName, product.ProductID])
      )
    },
    [product.resetProducts](state) {
      return {}
    }
  },
  intialStateProductIDsByProductName
)

export default combineReducers({
  products,
  productIDsByProductName,
  productEntities,
  productSearch
})
