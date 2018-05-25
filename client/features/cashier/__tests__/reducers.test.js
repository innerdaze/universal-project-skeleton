import {
  cashiers as cashierReducers,
  cashierEntities as cashierEntitiesReducers
} from '../reducers'
import operations from '../operations'
import {
  generateCashierModel,
  generateCashierModelArray
} from '../__fixtures__'

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
      const { invalidateCashiers } = operations
      const { isFetching, didInvalidate } = cashierReducers(
        initialState,
        invalidateCashiers()
      )

      expect(didInvalidate).toEqual(true)
    })

    test('Expect handle REQUEST_CASHIERS', () => {
      const { requestCashiers } = operations
      const { isFetching, didInvalidate } = cashierReducers(
        initialState,
        requestCashiers()
      )

      expect(didInvalidate).toEqual(false)
      expect(isFetching).toEqual(true)
    })

    test('Expect handle RESET_CASHIERS', () => {
      const { resetCashiers } = operations
      const { items } = cashierReducers(initialState, resetCashiers())

      expect(items).toEqual([])
    })

    test('Expect handle LOGIN_CASHIER', () => {
      const { loginCashierAuth } = operations
      const { isAuthenticating } = cashierReducers(
        initialState,
        loginCashierAuth()
      )

      expect(isAuthenticating).toEqual(true)
    })

    test('Expect handle LOGOUT_CASHIER', () => {
      const { logoutCashier } = operations
      const { activeCashier } = cashierReducers(initialState, logoutCashier())

      expect(activeCashier).toEqual(null)
    })

    test('Expect handle RECEIVE_CASHIERS', () => {
      const { receiveCashiers } = operations
      const cashierModelFixture = generateCashierModelArray(5)
      const { isFetching, didInvalidate, items } = cashierReducers(
        initialState,
        receiveCashiers(cashierModelFixture)
      )

      expect(isFetching).toEqual(false)
      expect(didInvalidate).toEqual(false)
      expect(items).toEqual(generateCashierModelArray(5))
    })

    test('Expect handle SUCCEED_LOGIN_CASHIER', () => {
      const cashier = [
        {
          CashierID: 1,
          Deleted: false
        },
        {
          CashierID: 2,
          Deleted: true
        }
      ]

      const action = {
        type: 'CASHIER/SUCCEED_LOGIN_CASHIER',
        payload: {
          cashier
        }
      }

      const expectedState = {
        ...initialState,
        isAuthenticating: false,
        activeCashier: cashier
      }
      const { succeedLoginCashier } = operations
      const generateCashierModelFixture = generateCashierModel()
      const { isAuthenticating, activeCashier } = cashierReducers(
        initialState,
        succeedLoginCashier(generateCashierModelFixture.json)
      )

      expect(isAuthenticating).toEqual(false)
      expect(activeCashier).toEqual(generateCashierModelFixture.json)
    })

    test('Expect handle FAIL_LOGIN_CASHIER', () => {
      const error = 'Error message'

      const action = {
        type: 'CASHIER/FAIL_LOGIN_CASHIER',
        payload: {
          error
        }
      }

      const expectedState = {
        ...initialState,
        isAuthenticating: false,
        authError: error
      }

      const { failLoginCashier } = operations
      const generateCashierModelFixture = generateCashierModel()
      const { isAuthenticating, authError } = cashierReducers(
        initialState,
        failLoginCashier(generateCashierModelFixture.error)
      )

      expect(isAuthenticating).toEqual(false)
      expect(authError).toEqual(generateCashierModelFixture.error)
    })
  })

  describe('Test cashierEntities reducer', () => {
    test('Expect handle RECEIVE_CASHIERS', () => {
      const expectedValue = {
        '1': {
          CashierID: 1,
          Deleted: false
        },
        '2': {
          CashierID: 2,
          Deleted: true
        }
      }
      const { receiveCashiers } = operations
      const generateCashierModelFixture = generateCashierModel()
      const response = cashierEntitiesReducers(
        initialState,
        receiveCashiers(generateCashierModelFixture.json)
      )

      expect(response).toEqual(expectedValue)
    })
  })
})
