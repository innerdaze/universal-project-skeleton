import productReducers from '../../features/product/reducers'

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
      let action = {
        type: 'PRODUCT/REQUEST_PRODUCTS'
      }

      let expectedState = {
        ...initialStateProduct,
        isFetching: true,
        didInvalidate: false
      }

      expect(productReducers({}, action).products).toEqual(expectedState)
    })

    test('Expect handle INVALIDATE_PRODUCTS', () => {
      let action = {
        type: 'PRODUCT/INVALIDATE_PRODUCTS'
      }

      let expectedState = {
        ...initialStateProduct,
        didInvalidate: true
      }

      expect(productReducers({}, action).products).toEqual(expectedState)
    })

    test('Expect handle RESET_PRODUCTS', () => {
      let action = {
        type: 'PRODUCT/RESET_PRODUCTS'
      }

      let expectedState = {
        ...initialStateProduct,
        items: []
      }

      expect(productReducers({}, action).products).toEqual(expectedState)
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

      let action = {
        type: 'PRODUCT/RECEIVE_PRODUCTS',
        payload: {
          json
        }
      }

      let expectedState = {
        ...initialStateProduct,
        isFetching: false,
        didInvalidate: false,
        items: ['foo'],
        lastUpdated: expect.any(Number)
      }

      expect(productReducers({}, action).products).toEqual(expectedState)
    })
  })

  describe('Test productSearch reducer', () => {
    test('Expect handle SEARCH_PRODUCTS', () => {
      let expectedState = {
        ...initialStateProductSearch,
        isSearching: true
      }

      let action = {
        type: 'PRODUCT/SEARCH_PRODUCTS'
      }
      expect(productReducers({}, action).productSearch).toEqual(expectedState)
    })

    test('Expect handle SUCCEED_SEARCH_PRODUCTS', () => {
      let matches = []

      let expectedState = {
        ...initialStateProductSearch,
        isSearching: false,
        lastMatches: matches
      }

      let action = {
        type: 'PRODUCT/SUCCEED_SEARCH_PRODUCTS',
        payload: {
          matches
        }
      }
      expect(productReducers({}, action).productSearch).toEqual(expectedState)
    })

    test('Expect handle FAIL_SEARCH_PRODUCTS', () => {
      let query = 'foo'

      let expectedState = {
        ...initialStateProductSearch,
        isSearching: false,
        lastError: `No match for: ${query}`
      }

      let action = {
        type: 'PRODUCT/FAIL_SEARCH_PRODUCTS',
        payload: {
          query
        }
      }
      expect(productReducers({}, action).productSearch).toEqual(expectedState)
    })
  })

  describe('Test productSearch reducer', () => {
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

      let action = {
        type: 'PRODUCT/RECEIVE_PRODUCTS',
        payload: {
          json
        }
      }

      let expectedState = {
        ...intialStateProductEntities,
        foo: json[0],
        bar: json[1]
      }

      expect(productReducers({}, action).productEntities).toEqual(expectedState)
    })

    test('Expect handle RESET_PRODUCTS', () => {
      let action = {
        type: 'PRODUCT/RESET_PRODUCTS'
      }

      let expectedState = {
        ...intialStateProductEntities
      }

      expect(productReducers({}, action).productEntities).toEqual(expectedState)
    })
  })

  describe('Test productSearch reducer', () => {
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

      let action = {
        type: 'PRODUCT/RECEIVE_PRODUCTS',
        payload: {
          json
        }
      }

      let expectedState = {
        ...intialStateProductIDsByProductName,
        fooname: 'foo',
        barname: 'bar'
      }

      expect(productReducers({}, action).productIDsByProductName).toEqual(
        expectedState
      )
    })
  })
})
