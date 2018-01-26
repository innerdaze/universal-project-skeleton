
import { combineReducers } from 'redux'
import { handleActions } from 'redux-actions'
import actions from './actions'
import { keyBy, difference, fromPairs } from 'lodash'
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
const intialStateproductEntities = {}
const intialSatateproductIDsByProductName = {}

const reducerProduct = handleActions({
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
  },
}, initialStateProduct);

const productSearch = handleActions({
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
}, initialStateProductSearch);


const productEntities = handleActions({
  [product.receiveProducts](state, { payload: { products } }) {
    return
    keyBy(products, 'ProductID')
  },
  [product.resetProducts](state, { payload: { matches } }) {
    return {}
  }
}, intialStateproductEntities);

const productIDsByProductName = handleActions({
  [product.receiveProducts](state, { payload: { products } }) {
    return
    fromPairs(map(products, product => [product.ProductName, product.ProductID]))
  },
  [product.resetProducts](state, { payload: { matches } }) {
    return {}
  }
}, intialSatateproductIDsByProductName);

const reducer = combineReducers(reducerProduct, productIDsByProductName, productEntities, productSearch);

export default reducer;