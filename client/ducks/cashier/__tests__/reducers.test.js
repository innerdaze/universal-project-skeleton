import { map, keyBy } from 'lodash'
import operations from '../operations'
import reducer from '../reducers'
import fixtures from '../__fixtures__'

test('CASHIER/SUCCEED_LOGIN_CASHIER', () => {
  const { succeedLoginCashier } = operations
  const initialState = {
    cashiers: {
      isAuthenticating: true,
      activeCashier: null
    }
  }

  const cashier = fixtures.entity

  const { cashiers: { isAuthenticating, activeCashier } } = reducer(
    initialState,
    succeedLoginCashier(cashier)
  )

  expect(isAuthenticating).toBe(false)
  expect(activeCashier).toBe(cashier)
})

test('CASHIER/FAIL_LOGIN_CASHIER', () => {
  const { failLoginCashier } = operations
  const initialState = {
    cashiers: {
      isAuthenticating: true,
      authError: null
    }
  }
  const error = 'TEST ERROR'

  const { cashiers: { isAuthenticating, authError } } = reducer(
    initialState,
    failLoginCashier(error)
  )

  expect(isAuthenticating).toBe(false)
  expect(authError).toBe(error)
})

test('CASHIER/RECEIVE_CASHIERS', () => {
  const { receiveCashiers } = operations
  const initialState = {
    cashiers: {
      isFetching: true,
      didInvalidate: false,
      items: [],
      lastUpdated: null
    },
    cashierEntities: {}
  }
  const cashiers = Array(5).fill(fixtures.entity)

  const {
    cashiers: { isFetching, didInvalidate, items, lastUpdated },
    cashierEntities
  } = reducer(initialState, receiveCashiers(cashiers))

  expect(isFetching).toBe(false)
  expect(didInvalidate).toBe(false)
  expect(items).toEqual(
    map(cashiers.filter(item => !item.Deleted), 'CashierID')
  )
  expect(cashierEntities).toEqual(keyBy(cashiers, 'CashierID'))
})
