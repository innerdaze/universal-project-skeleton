import reducer from '../reducer'
import operations from '../operations'
import { generateAppModel, generateAppModelArray } from '../__fixtures__'

let initialState = {}

describe('App Reducer', () => {
  test('test APP_READY', () => {
    const appModelFixture = generateAppModel()
    const { appReady } = operations

    const { apiRoot } = reducer(initialState, { type: 'APP/READY' })

    expect(apiRoot).toEqual(appModelFixture.isReady)
  })
})
