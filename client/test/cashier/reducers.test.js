import cashierReducers from '../../features/cashier/reducers'

let initialState = {
  isFetching: false,
  didInvalidate: false,
  lastUpdated: null,
  items: [],
  activeCashier: {
    CashierID: 1
  },
  isAuthenticating: false,
  authError: null,
  error: null
}

describe('Testing on cashier reducers', () => {
  describe('Test cashiers reducer', () => {
    test('Expect handle INVALIDATE_CASHIERS', () => {
      let action = {
        type: 'CASHIER/INVALIDATE_CASHIERS'
      }

      let expectedState = {
        ...initialState,
        didInvalidate: true
      }

      expect(cashierReducers({}, action).cashiers).toEqual(expectedState)
    })

    test('Expect handle REQUEST_CASHIERS', () => {
      let action = {
        type: 'CASHIER/REQUEST_CASHIERS'
      }

      let expectedState = {
        ...initialState,
        isFetching: true,
        didInvalidate: false
      }

      expect(cashierReducers({}, action).cashiers).toEqual(expectedState)
    })

    test('Expect handle RESET_CASHIERS', () => {
      let action = {
        type: 'CASHIER/RESET_CASHIERS'
      }

      let expectedState = {
        ...initialState,
        items: []
      }

      expect(cashierReducers({}, action).cashiers).toEqual(expectedState)
    })

    test('Expect handle LOGIN_CASHIER', () => {
      let action = {
        type: 'CASHIER/LOGIN_CASHIER'
      }

      let expectedState = {
        ...initialState,
        isAuthenticating: true
      }

      expect(cashierReducers({}, action).cashiers).toEqual(expectedState)
    })

    test('Expect handle LOGOUT_CASHIER', () => {
      let action = {
        type: 'CASHIER/LOGOUT_CASHIER'
      }

      let expectedState = {
        ...initialState,
        activeCashier: null
      }

      expect(cashierReducers({}, action).cashiers).toEqual(expectedState)
    })

    test('Expect handle RECEIVE_CASHIERS', () => {
      let json = [
        {
          CashierID: 1,
          Deleted: false
        },
        {
          CashierID: 2,
          Deleted: true
        }
      ]

      let action = {
        type: 'CASHIER/RECEIVE_CASHIERS',
        payload: {
          json
        }
      }

      let expectedState = {
        ...initialState,
        isFetching: false,
        didInvalidate: false,
        items: [1],
        lastUpdated: Date.now()
      }

      expect(cashierReducers({}, action).cashiers).toEqual(expectedState)
    })

    test('Expect handle SUCCEED_LOGIN_CASHIER', () => {
      let cashier = [
        {
          CashierID: 1,
          Deleted: false
        },
        {
          CashierID: 2,
          Deleted: true
        }
      ]

      let action = {
        type: 'CASHIER/SUCCEED_LOGIN_CASHIER',
        payload: {
          cashier
        }
      }

      let expectedState = {
        ...initialState,
        isAuthenticating: false,
        activeCashier: cashier
      }

      expect(cashierReducers({}, action).cashiers).toEqual(expectedState)
    })

    test('Expect handle FAIL_LOGIN_CASHIER', () => {
      let error = 'Error message'

      let action = {
        type: 'CASHIER/FAIL_LOGIN_CASHIER',
        payload: {
          error
        }
      }

      let expectedState = {
        ...initialState,
        isAuthenticating: false,
        authError: error
      }

      expect(cashierReducers({}, action).cashiers).toEqual(expectedState)
    })
  })

  describe('Test cashierEntities reducer', () => {
    test('Expect handle RECEIVE_CASHIERS', () => {
      let json = [
        {
          CashierID: 1,
          Deleted: false
        },
        {
          CashierID: 2,
          Deleted: true
        }
      ]

      let action = {
        type: 'CASHIER/RECEIVE_CASHIERS',
        payload: {
          json
        }
      }

      let expectedValue = {
        '1': {
          CashierID: 1,
          Deleted: false
        },
        '2': {
          CashierID: 2,
          Deleted: true
        }
      }

      expect(cashierReducers({}, action).cashierEntities).toEqual(expectedValue)
    })
  })
})
