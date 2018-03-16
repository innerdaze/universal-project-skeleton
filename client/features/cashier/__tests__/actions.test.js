import cashierActions from '../actions'

describe('Testing on cashier actions', () => {
  test('Test receiveCashiers', () => {
    let json = { foo: 'bar' }
    let expectedAction = {
      type: 'CASHIER/RECEIVE_CASHIERS',
      payload: {
        json
      }
    }
    expect(cashierActions.cashier.receiveCashiers(json)).toEqual(expectedAction)
  })

  test('Test succeedLoginCashier', () => {
    let cashier = {}
    let expectedAction = {
      type: 'CASHIER/SUCCEED_LOGIN_CASHIER',
      payload: {
        cashier
      }
    }
    expect(cashierActions.cashier.succeedLoginCashier(cashier)).toEqual(
      expectedAction
    )
  })

  test('Test failLoginCashier', () => {
    let error = {}
    let expectedAction = {
      type: 'CASHIER/FAIL_LOGIN_CASHIER',
      payload: {
        error
      }
    }
    expect(cashierActions.cashier.failLoginCashier(error)).toEqual(
      expectedAction
    )
  })
})
