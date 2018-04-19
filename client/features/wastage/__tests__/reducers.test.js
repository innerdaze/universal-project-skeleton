import { pluck, indexBy, prop } from 'ramda'
import operations from '../operations'
import {
  wastageTypes as wastageTypesReducer,
  wastageProcessing as wastageProcessingReducer,
  wastageEntities as wastageEntitiesReducer,
  wastageTypeToOrderMap as wastageTypeToOrderMapReducer
} from '../reducers'
import {
  generateWastage,
  generateWastageTypeArray,
  generateWastageArray
} from '../__fixtures__'

describe('WASTAGE/ACTIONS', () => {
  test('REQUEST_WASTAGE_TYPES', () => {
    const { requestWastageTypes } = operations
    const initialState = {
      isFetching: false
    }

    const { isFetching } = wastageTypesReducer(
      initialState,
      requestWastageTypes()
    )

    expect(isFetching).toBe(true)
  })

  test('RECEIVE_WASTAGE_TYPES ➤ Success', () => {
    const { receiveWastageTypes } = operations
    const initialState = {
      isFetching: true,
      didInvalidate: false,
      allIds: [],
      byId: {},
      lastUpdated: null,
      error: null
    }

    const wastageTypeFixtures = generateWastageTypeArray(3)

    const {
      isFetching,
      didInvalidate,
      allIds,
      byId,
      lastUpdated,
      error
    } = wastageTypesReducer(
      initialState,
      receiveWastageTypes(wastageTypeFixtures)
    )

    expect(isFetching).toBe(false)
    expect(didInvalidate).toBe(false)
    expect(allIds).toEqual(pluck('TypeID', wastageTypeFixtures))
    expect(byId).toEqual(indexBy(prop('TypeID'), wastageTypeFixtures))
    expect(error).toBeNull()
  })

  test('RECEIVE_WASTAGE_TYPES ➤ Error', () => {
    const { receiveWastageTypes } = operations
    const initialState = {
      isFetching: true,
      error: null
    }
    const mockError = Error('TEST ERROR')

    const { error, isFetching } = wastageTypesReducer(
      initialState,
      receiveWastageTypes(mockError)
    )

    expect(error).toBe(mockError)
    expect(isFetching).toBe(false)
  })

  test('REQUEST_PROCESS_WASTAGE', () => {
    const { requestProcessWastage } = operations
    const initialState = {
      isProcessing: false
    }

    const { isProcessing } = wastageProcessingReducer(
      initialState,
      requestProcessWastage()
    )

    expect(isProcessing).toBe(true)
  })

  test('RECEIVE_PROCESS_WASTAGE ➤ Success', () => {
    const { receiveProcessWastage } = operations
    const initialProcessingState = {
      isProcessing: true,
      error: null
    }
    const initialEntitiesState = {
      byId: { a: { id: 'a' } },
      allIds: ['a']
    }

    const { isProcessing, error } = wastageProcessingReducer(
      initialProcessingState,
      receiveProcessWastage()
    )

    expect(isProcessing).toBe(false)
    expect(error).toBeNull()
  })

  test('RECEIVE_PROCESS_WASTAGE ➤ Error', () => {
    const { receiveProcessWastage } = operations
    const initialState = {
      isProcessing: true,
      error: null
    }
    const mockError = Error('TEST ERROR')

    const { isProcessing, error } = wastageProcessingReducer(
      initialState,
      receiveProcessWastage(mockError)
    )

    expect(isProcessing).toBe(false)
    expect(error).toBe(mockError)
  })

  test('UPDATE_WASTAGE_TYPE_MAPPING', () => {
    const { updateWastageTypeMapping } = operations
    const wastageEntity = generateWastage()
    const { _id } = wastageEntity

    const initialState = {}

    const map = wastageTypeToOrderMapReducer(
      initialState,
      updateWastageTypeMapping(_id, 'TEST')
    )

    expect(map[_id]).toBe('TEST')
  })
})
