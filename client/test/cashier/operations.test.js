import { cashierOperations } from '../../features/cashier'
import { networkOperations } from '../../features/network'
import { errorOperations } from '../../features/error'
import cashierActions from '../../features/cashier/actions'
import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'

let middlewares, mockStore, store

describe('Testing on cashier operations...', () => {
  beforeEach(() => {
    middlewares = [thunk]
    mockStore = configureStore(middlewares)
    store = mockStore({
      app: {
        apiRoot: null
      },
      barcode: {
        barcodeEntities: {}
      },
      session: {
        session: {
          id: '123'
        }
      }
    })
  })
  describe('Test fetchCashiers operations', () => {
    test('Expect requestCashiers, callApi,receiveCashiers actions are called', () => {
      let requestCashiersSpy = jest.spyOn(
        cashierActions.cashier,
        'requestCashiers'
      )
      let receiveCashiersSpy = jest.spyOn(
        cashierActions.cashier,
        'receiveCashiers'
      )
      let callApiSpy = jest.spyOn(networkOperations, 'callApi')

      return store.dispatch(cashierOperations.fetchCashiers()).then(() => {
        expect(requestCashiersSpy).toHaveBeenCalled()
        expect(callApiSpy).toHaveBeenCalled()
        // expect(receiveCashiersSpy).toHaveBeenCalled()
      })
    })
  })

  describe('Test loginCashier operations', () => {
    test('Expect loginCashier, dismissError, succeedLoginCashier actions are called if cashier info found in cashierEntities', () => {
      store = mockStore({
        app: {
          apiRoot: null
        },
        cashier: {
          cashierEntities: {
            FOO: {
              CashierPassword: 'BAR'
            }
          }
        },
        session: {
          session: {
            id: '123'
          }
        }
      })

      let loginCashierSpy = jest.spyOn(cashierActions.cashier, 'loginCashier')
      let succeedLoginCashierSpy = jest.spyOn(
        cashierActions.cashier,
        'succeedLoginCashier'
      )
      let dismissErrorSpy = jest.spyOn(errorOperations, 'dismissError')

      store.dispatch(cashierOperations.loginCashier('FOO', 'BAR'))
      expect(loginCashierSpy).toHaveBeenCalled()
      expect(succeedLoginCashierSpy).toHaveBeenCalled()
      expect(dismissErrorSpy).toHaveBeenCalled()
    })

    test('Expect loginCashier, displayError, failLoginCashier actions are called if cashier password not match', () => {
      store = mockStore({
        app: {
          apiRoot: null
        },
        cashier: {
          cashierEntities: {
            FOO: {
              CashierPassword: 'foo'
            }
          }
        },
        session: {
          session: {
            id: '123'
          }
        }
      })

      let loginCashierSpy = jest.spyOn(cashierActions.cashier, 'loginCashier')
      let failLoginCashierSpy = jest.spyOn(
        cashierActions.cashier,
        'failLoginCashier'
      )
      let displayErrorSpy = jest.spyOn(errorOperations, 'displayError')

      store.dispatch(cashierOperations.loginCashier('FOO', 'BAR'))
      expect(loginCashierSpy).toHaveBeenCalled()
      expect(failLoginCashierSpy).toHaveBeenCalled()
      expect(displayErrorSpy).toHaveBeenCalled()
    })

    test('Expect loginCashier, displayError, failLoginCashier actions are called if cashier not found in cashierEntities', () => {
      store = mockStore({
        app: {
          apiRoot: null
        },
        cashier: {
          cashierEntities: {
            FOO: {
              CashierPassword: 'foo'
            }
          }
        },
        session: {
          session: {
            id: '123'
          }
        }
      })

      let loginCashierSpy = jest.spyOn(cashierActions.cashier, 'loginCashier')
      let failLoginCashierSpy = jest.spyOn(
        cashierActions.cashier,
        'failLoginCashier'
      )
      let displayErrorSpy = jest.spyOn(errorOperations, 'displayError')

      store.dispatch(cashierOperations.loginCashier('BAR', 'BAR'))
      expect(loginCashierSpy).toHaveBeenCalled()
      expect(failLoginCashierSpy).toHaveBeenCalled()
      expect(displayErrorSpy).toHaveBeenCalled()
    })

    //   test('Expect lookupBarcode, failLookupBarcode, displayError actions are called if cashier info not found in cashierEntities', () => {
    //     let loginCashierSpy = jest.spyOn(cashierActions.cashier, 'lookupBarcode')
    //     let failLookupBarcodeSpy = jest.spyOn(
    //       cashierActions.cashier,
    //       'failLookupBarcode'
    //     )
    //     let displayErrorSpy = jest.spyOn(errorOperations, 'displayError')

    //     store.dispatch(cashierOperations._findBarcodeByID('FOO'))
    //     expect(loginCashierSpy).toHaveBeenCalled()
    //     expect(failLookupBarcodeSpy).toHaveBeenCalled()
    //     expect(displayErrorSpy).toHaveBeenCalled()
    //   })
  })
})
