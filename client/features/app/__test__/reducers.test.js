import reducer from '../reducer'
import operations from '../operations'
import {
  generateappModel,
  generateappModelArray,
} from '../__fixtures__'
import { pluck, indexBy, prop } from 'ramda'
//import faker from 'faker'
//const AppAction=actions.app
let intialSt = {
  isInitialized: false,
  apiRoot: null,
  apiRootValid: false,
  storeID: '0'
}



describe('app reducer test', () => {
  test('test APP_SET_API_ROOT', () => {
    const appModelFixutre=generateappModel()
    const {appSetApiRoot}=operations
    let {apiRoot}=reducer(intialSt,appSetApiRoot(appModelFixutre.apiRoot))
    expect(apiRoot).toEqual(appModelFixutre.apiRoot)
  })
  test('testAPP_INITIALIZE', () => {
    const {appInitialize}=operations
    let {isInitialized}=reducer(intialSt,appInitialize())
    expect(isInitialized).toEqual(true)
  })
  test('test API_ROOT_VALID', () => {
    let {apiRootValidate}=operations
    let {apiRootValid}=reducer(intialSt,apiRootValidate())
    expect(apiRootValid).toEqual(true)
  })
  test('test API_ROOT_INVALID', () => {
    const {apiRootInvalid}=operations
    let {apiRootValid}=reducer(intialSt,apiRootInvalid())
    expect(apiRootValid).toEqual(false)
  })
  test('test APP_RESET', () => {
    const {appReset}=operations
    let {apiRootValid,isInitialized,apiRoot}=reducer(intialSt,appReset())
    expect(apiRootValid).toEqual(false)
    expect(isInitialized).toEqual(false)
    expect(apiRoot).toEqual(null)
  })
  test('test APP_SET_STORE_ID', () => {
    const appModelFixutre=generateappModel()
    const {appSetStoreId}=operations
    let {storeID}=reducer(intialSt,appSetStoreId(appModelFixutre.storeID))
    expect(storeID).toEqual(appModelFixutre.storeID)
  })
})
