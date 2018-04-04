import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import fetchMock from 'fetch-mock'
import expect from 'expect'
import { indexBy, pluck, prop } from 'ramda'
import operations from '../operations'
import { generateWastageTypeArray, generateWastageArray } from '../__fixtures__'

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

    const wastageLines = generateWastageArray(3)

    const expectedActions = [
      {
        type: 'WASTAGE/REQUEST_PROCESS_WASTAGE'
      },
      {
        type: 'WASTAGE/RECEIVE_PROCESS_WASTAGE'
      }
    ]

    const store = mockStore({
      app: {
        apiRoot: '/'
      },
      session: {
        session: { id: '0' }
      },
      wastage: {
        wastageEntities: {
          byId: indexBy(prop('_id'), wastageLines),
          allIds: pluck('_id', wastageLines)
        }
      }
    })

    return store.dispatch(operations.processWastage()).then(() => {
      expect(store.getActions()).toEqual(expectedActions)
      expect(fetchMock.called()).toBe(true)

      const lastBody = JSON.parse(fetchMock.lastOptions().body)

      expect(lastBody.method).toBe('WastageService.ProcessWastage')
      expect(lastBody.params.ListOfWastageLines).toEqual(wastageLines)
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
      }
    ]

    const wastageLines = generateWastageArray(3)

    const store = mockStore({
      app: {
        apiRoot: '/'
      },
      session: { session: { id: 0 } },
      wastage: {
        wastageEntities: {
          byId: indexBy(prop('_id'), wastageLines),
          allIds: pluck('_id', wastageLines)
        }
      }
    })

    return store.dispatch(operations.processWastage()).then(() => {
      expect(store.getActions()).toEqual(expectedActions)
    })
  })
})
