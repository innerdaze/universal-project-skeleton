import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import fetchMock from 'fetch-mock'
import expect from 'expect'
import { indexBy, pluck, prop } from 'ramda'
import operations from '../operations'
import {
  generateWastage,
  generateWastageTypeArray,
  generateWastageArray,
  generateOrder
} from '../__fixtures__'

const middleWares = [thunk]
const mockStore = configureMockStore(middleWares)

describe('WASTAGE/THUNKS', () => {
  afterEach(() => {
    fetchMock.reset()
    fetchMock.restore()
  })

  test('fetchWastageTypes ➤ Success', () => {
    const mockResultData = generateWastageTypeArray(3)

    fetchMock.postOnce('/', {
      body: {
        result: {
          Result: {
            ListOfWastageTypes: mockResultData,
            ResMessage: {
              __type: 'ResultMessage',
              ResCode: 0,
              ResMessage: 'OK'
            }
          }
        }
      }
    })

    const expectedActions = [
      {
        type: 'WASTAGE/REQUEST_WASTAGE_TYPES'
      },
      {
        type: 'WASTAGE/RECEIVE_WASTAGE_TYPES',
        payload: {
          models: mockResultData
        }
      }
    ]

    const store = mockStore({
      app: {
        apiRoot: '/'
      },
      session: { session: { id: '0' } },
      wastage: {
        wastageTypes: {
          byId: {},
          allIds: []
        }
      }
    })

    return store.dispatch(operations.fetchWastageTypes()).then(() => {
      expect(store.getActions()).toEqual(expectedActions)
      expect(fetchMock.called()).toBe(true)
      expect(JSON.parse(fetchMock.lastOptions().body).method).toBe(
        'WastageService.GetWastageTypes'
      )
    })
  })

  test('fetchWastageTypes ➤ Error', () => {
    fetchMock.postOnce('*', {
      body: {
        result: {
          Result: {
            ResCode: 1,
            ResMessage: 'TEST ERROR'
          }
        }
      },
      status: 500
    })

    const expectedActions = [
      {
        type: 'WASTAGE/REQUEST_WASTAGE_TYPES'
      },
      {
        type: 'ERROR/DISPLAY_ERROR',
        payload: { error: 'TEST ERROR' }
      },
      {
        type: 'WASTAGE/RECEIVE_WASTAGE_TYPES',
        error: true,
        payload: Error('TEST ERROR')
      }
    ]

    const store = mockStore({
      app: {
        apiRoot: '/'
      },
      session: { session: { id: 0 } }
    })

    return store.dispatch(operations.fetchWastageTypes()).then(() => {
      expect(store.getActions()).toEqual(expectedActions)
    })
  })

  test('processWastage ➤ Success', () => {
    fetchMock.postOnce('*', {
      body: {
        result: {
          Result: {
            ResCode: 0,
            ResMessage: null
          }
        }
      }
    })

    const orderEntity = generateOrder({})
    const wastageEntity = generateWastage({})

    orderEntity.TransType = 99

    const { _id } = orderEntity
    wastageEntity._id = _id
    wastageEntity.ProductID = orderEntity.ProductID
    wastageEntity.Qty = orderEntity.Qty
    wastageEntity.StoreID = 0

    const expectedActions = [
      {
        type: 'WASTAGE/REQUEST_PROCESS_WASTAGE'
      },
      {
        type: 'WASTAGE/RECEIVE_PROCESS_WASTAGE'
      },
      {
        type: 'ORDER/RECEIVE_PROCESS_ORDERS'
      },
      {
        type: 'ORDER/SUCCEED_PROCESS_ORDERS',
        payload: { orderIDs: [_id] }
      }
    ]

    const store = mockStore({
      app: {
        apiRoot: '/',
        storeID: 0
      },
      session: {
        session: { id: '0' }
      },
      order: {
        orders: {
          mode: 99,
          unprocessedItems: [_id]
        },
        orderEntities: { [_id]: orderEntity }
      },
      wastage: {
        wastageEntities: {
          isChangingWastageType: false,
          changingWastageTypeFor: null
        },
        wastageTypeToOrderMap: {
          [_id]: wastageEntity.TypeID
        }
      }
    })

    return store.dispatch(operations.processWastage()).then(() => {
      expect(store.getActions()).toEqual(expectedActions)
      expect(fetchMock.called()).toBe(true)

      const lastBody = JSON.parse(fetchMock.lastOptions().body)

      expect(lastBody.method).toBe('WastageService.ProcessWastage')
      expect(lastBody.params.ListOfWastageLines).toEqual([wastageEntity])
    })
  })

  test('processWastage ➤ Error', () => {
    fetchMock.postOnce('*', {
      body: {
        result: {
          Result: {
            ResCode: 1,
            ResMessage: 'TEST ERROR'
          }
        }
      },
      status: 500
    })

    const orderEntity = generateOrder({})
    const wastageEntity = generateWastage({})

    orderEntity.TransType = 99

    const { _id } = orderEntity
    wastageEntity._id = _id
    wastageEntity.ProductID = orderEntity.ProductID
    wastageEntity.Qty = orderEntity.Qty
    wastageEntity.StoreID = 0

    const expectedActions = [
      {
        type: 'WASTAGE/REQUEST_PROCESS_WASTAGE'
      },
      {
        type: 'ERROR/DISPLAY_ERROR',
        payload: { error: 'TEST ERROR' }
      },
      {
        type: 'WASTAGE/RECEIVE_PROCESS_WASTAGE',
        error: true,
        payload: Error('TEST ERROR')
      },
      {
        type: 'ORDER/RECEIVE_PROCESS_ORDERS'
      },
      {
        type: 'ORDER/FAIL_PROCESS_ORDERS',
        payload: Error('TEST ERROR'),
        error: true
      }
    ]

    const wastageLines = generateWastageArray(3)

    const store = mockStore({
      app: {
        apiRoot: '/',
        storeID: 0
      },
      session: {
        session: { id: '0' }
      },
      order: {
        orders: {
          mode: 99,
          unprocessedItems: [_id]
        },
        orderEntities: { [_id]: orderEntity }
      },
      wastage: {
        wastageEntities: {
          isChangingWastageType: false,
          changingWastageTypeFor: null
        },
        wastageTypeToOrderMap: {
          [_id]: wastageEntity.TypeID
        }
      }
    })

    return store.dispatch(operations.processWastage()).then(() => {
      expect(store.getActions()).toEqual(expectedActions)
    })
  })
})
