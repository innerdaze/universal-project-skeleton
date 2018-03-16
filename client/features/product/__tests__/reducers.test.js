import {
  products as productsReducer,
  productSearch as productSearchReducer,
  productEntities as productEntitiesReducer,
  productIDsByProductName as productIDsByProductNameReducer
} from '../reducers'
import productActions from '../actions'
import { productModel } from '../__fixtures__'

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
let intialStateProductEntities = {}
let intialStateProductIDsByProductName = {}

describe('Testing on product reducers...', () => {
  describe('Test products reducer', () => {
    test('Expect handle REQUEST_PRODUCTS', () => {
      const { isFetching, didInvalidate } = productsReducer(
        initialStateProduct,
        productActions.product.requestProducts()
      )

      expect(isFetching).toEqual(true)
      expect(didInvalidate).toEqual(false)
    })

    test('Expect handle INVALIDATE_PRODUCTS', () => {
      const { didInvalidate } = productsReducer(
        initialStateProduct,
        productActions.product.invalidateProducts()
      )

      expect(didInvalidate).toEqual(true)
    })

    test('Expect handle RESET_PRODUCTS', () => {
      const { items } = productsReducer(
        initialStateProduct,
        productActions.product.resetProducts()
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
        productActions.product.receiveProducts(json)
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
        productActions.product.searchProducts()
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
        productActions.product.succeedSearchProducts(matches)
      )

      expect(isSearching).toEqual(false)
      expect(lastMatches).toEqual(matches)
    })

    test('Expect handle FAIL_SEARCH_PRODUCTS', () => {
      let mockQuery = productModel.query

      const { isSearching, lastError } = productSearchReducer(
        initialStateProduct,
        productActions.product.failSearchProducts(mockQuery)
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
        ...intialStateProductEntities,
        foo: json[0],
        bar: json[1]
      }

      const returnState = productEntitiesReducer(
        intialStateProductEntities,
        productActions.product.receiveProducts(json)
      )

      expect(returnState).toEqual(expectedState)
    })

    test('Expect handle RESET_PRODUCTS', () => {
      const returnState = productEntitiesReducer(
        intialStateProductEntities,
        productActions.product.resetProducts()
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
        ...intialStateProductIDsByProductName,
        fooname: 'foo',
        barname: 'bar'
      }

      const returnState = productIDsByProductNameReducer(
        intialStateProductEntities,
        productActions.product.receiveProducts(json)
      )

      expect(returnState).toEqual(expectedState)
    })

    test('Expect handle RESET_PRODUCTS', () => {
      const returnState = productIDsByProductNameReducer(
        intialStateProductIDsByProductName,
        productActions.product.resetProducts()
      )

      expect(returnState).toEqual({})
    })
  })
})
