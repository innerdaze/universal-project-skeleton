import networkOperations from '../../features/network/operations'
import networkActions from '../../features/network/actions'
import { failIfMissing } from '../../helpers/function'
import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'

let mockStore, middlewares, store

describe('Testing on network operations', () => {
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
  describe('Test on callApi', () => {
    test('Expect netFailOffline not called if network is online', () => {
      let callApiArg = {
        service: 'test'
      }
      let netFailOfflineSpy = jest.spyOn(
        networkActions.network,
        'netFailOffline'
      )
      return store.dispatch(networkOperations.callApi(callApiArg)).then(() => {
        expect(netFailOfflineSpy).not.toHaveBeenCalled()
      })
    })
  })
})
