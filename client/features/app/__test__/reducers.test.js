import reducer from '../reducer'
import operations from '../operations'
import { generateappModel, generateappModelArray } from '../__fixtures__'
import { pluck, indexBy, prop } from 'ramda'
//import faker from 'faker'
//const AppAction=actions.app
let initialState = {
  isInitialized: false,
  apiRoot: null,
  apiRootValid: false,
  storeID: '0'
}

describe('app reducer test', () => {
  test('test APP_SET_API_ROOT', () => {
    const appModelFixture = generateappModel()
    const { appSetApiRoot } = operations
    const { apiRoot } = reducer(
      initialState,
      appSetApiRoot(appModelFixture.apiRoot)
    )
    expect(apiRoot).toEqual(appModelFixture.apiRoot)
  })
  test('testAPP_INITIALIZE', () => {
    const { appInitialize } = operations
    const { isInitialized } = reducer(initialState, appInitialize())
    expect(isInitialized).toEqual(true)
  })
  test('test API_ROOT_VALID', () => {
    const { apiRootValidate } = operations
    const { apiRootValid } = reducer(initialState, apiRootValidate())
    expect(apiRootValid).toEqual(true)
  })
  test('test API_ROOT_INVALID', () => {
    const { apiRootInvalid } = operations
    const { apiRootValid } = reducer(initialState, apiRootInvalid())
    expect(apiRootValid).toEqual(false)
  })
  test('test APP_RESET', () => {
    const { appReconfigure } = operations
    const { apiRootValid, isInitialized, apiRoot } = reducer(
      initialState,
      appReconfigure()
    )
    expect(apiRootValid).toEqual(false)
    expect(isInitialized).toEqual(false)
    expect(apiRoot).toEqual(null)
  })
  test('test APP_SET_STORE_ID', () => {
    const appModelFixture = generateappModel()
    const { appSetStoreId } = operations
    const { storeID } = reducer(
      initialState,
      appSetStoreId(appModelFixture.storeID)
    )
    expect(storeID).toEqual(appModelFixture.storeID)
  })
})
