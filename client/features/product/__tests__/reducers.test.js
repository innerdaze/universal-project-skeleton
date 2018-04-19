import {
  products as productsReducer,
  productSearch as productSearchReducer,
  productEntities as productEntitiesReducer,
  productIDsByProductName as productIDsByProductNameReducer
} from '../reducers'
import actions from '../actions'
import { productModel } from '../__fixtures__'

const { product: productActions } = actions

let initialStateProduct = {
  isFetching: false,
  didInvalidate: false,
  lastUpdated: null,
  items: []
}
let initialStateProductSearch = {
  isSearching: false,
  lastError: null,
  lastMatches: []
}
let initialStateProductEntities = {}
let initialStateProductIDsByProductName = {}

describe('Testing on product reducers...', () => {
  describe('Test products reducer', () => {
    test('Expect handle REQUEST_PRODUCTS', () => {
      const { isFetching, didInvalidate } = productsReducer(
        initialStateProduct,
        productActions.requestProducts()
      )

      expect(isFetching).toEqual(true)
      expect(didInvalidate).toEqual(false)
    })

    test('Expect handle INVALIDATE_PRODUCTS', () => {
      const { didInvalidate } = productsReducer(
        initialStateProduct,
        productActions.invalidateProducts()
      )

      expect(didInvalidate).toEqual(true)
    })

    test('Expect handle RESET_PRODUCTS', () => {
      const { items } = productsReducer(
        initialStateProduct,
        productActions.resetProducts()
      )

      expect(items).toHaveLength(0)
    })

    test('Expect handle RECEIVE_PRODUCTS', () => {
      let json = [
        {
          ProductID: 'foo',
          Deleted: false
        },
        {
          ProductID: 'bar',
          Deleted: true
        }
      ]

      const { isFetching, didInvalidate, items, lastUpdated } = productsReducer(
        initialStateProduct,
        productActions.receiveProducts(json)
      )

      expect(isFetching).toEqual(false)
      expect(didInvalidate).toEqual(false)
      expect(items).toHaveLength(1)
      expect(lastUpdated).toEqual(expect.any(Number))
    })
  })

  describe('Test productSearch reducer', () => {
    test('Expect handle SEARCH_PRODUCTS', () => {
      const { isSearching } = productSearchReducer(
        initialStateProductSearch,
        productActions.searchProducts()
      )

      expect(isSearching).toEqual(true)
    })

    test('Expect handle SUCCEED_SEARCH_PRODUCTS', () => {
      let matches = {
        ProductID: 'foo',
        Deleted: false
      }

      const { isSearching, lastMatches } = productSearchReducer(
        initialStateProductSearch,
        productActions.succeedSearchProducts(matches)
      )

      expect(isSearching).toEqual(false)
      expect(lastMatches).toEqual(matches)
    })

    test('Expect handle FAIL_SEARCH_PRODUCTS', () => {
      let mockQuery = productModel.query

      const { isSearching, lastError } = productSearchReducer(
        initialStateProduct,
        productActions.failSearchProducts(mockQuery)
      )

      expect(isSearching).toEqual(false)
      expect(lastError).toEqual(`No match for: ${mockQuery}`)
    })
  })

  describe('Test productEntities reducer', () => {
    test('Expect handle RECEIVE_PRODUCTS', () => {
      let json = [
        {
          ProductID: 'foo',
          Deleted: false
        },
        {
          ProductID: 'bar',
          Deleted: true
        }
      ]

      let expectedState = {
        ...initialStateProductEntities,
        foo: json[0],
        bar: json[1]
      }

      const returnState = productEntitiesReducer(
        initialStateProductEntities,
        productActions.receiveProducts(json)
      )

      expect(returnState).toEqual(expectedState)
    })

    test('Expect handle RESET_PRODUCTS', () => {
      const returnState = productEntitiesReducer(
        initialStateProductEntities,
        productActions.resetProducts()
      )

      expect(returnState).toEqual({})
    })
  })

  describe('Test productIDsByProductName reducer', () => {
    test('Expect handle RECEIVE_PRODUCTS', () => {
      let json = [
        {
          ProductID: 'foo',
          ProductName: 'fooname',
          Deleted: false
        },
        {
          ProductID: 'bar',
          ProductName: 'barname',
          Deleted: true
        }
      ]

      let expectedState = {
        ...initialStateProductIDsByProductName,
        fooname: 'foo',
        barname: 'bar'
      }

      const returnState = productIDsByProductNameReducer(
        initialStateProductEntities,
        productActions.receiveProducts(json)
      )

      expect(returnState).toEqual(expectedState)
    })

    test('Expect handle RESET_PRODUCTS', () => {
      const returnState = productIDsByProductNameReducer(
        initialStateProductIDsByProductName,
        productActions.resetProducts()
      )

      expect(returnState).toEqual({})
    })
  })
})
