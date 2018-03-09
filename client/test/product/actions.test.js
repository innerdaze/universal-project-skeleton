import productActions from '../../features/product/actions'

describe('Testing production actions...', () => {
  test('Test on receiveProducts', () => {
    let json = {
      foo: 'bar'
    }

    let expectedAction = {
      type: 'PRODUCT/RECEIVE_PRODUCTS',
      payload: {
        json
      }
    }
    expect(productActions.product.receiveProducts(json)).toEqual(expectedAction)
  })

  test('Test on receiveProducts', () => {
    let matches = []

    let expectedAction = {
      type: 'PRODUCT/SUCCEED_SEARCH_PRODUCTS',
      payload: {
        matches
      }
    }
    expect(productActions.product.succeedSearchProducts(matches)).toEqual(
      expectedAction
    )
  })

  test('Test on failSearchProducts', () => {
    let query = 'foo'

    let expectedAction = {
      type: 'PRODUCT/FAIL_SEARCH_PRODUCTS',
      payload: {
        query
      }
    }
    expect(productActions.product.failSearchProducts(query)).toEqual(
      expectedAction
    )
  })
})
