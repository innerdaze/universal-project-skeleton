import { reducer as syncReducers } from '../reducers'
import { syncAction } from '../operations'
import { syncModel } from '../__fixtures__'

let initialState = {
  isSyncing: false,
  progress: 0
}

describe('Testing on sync reducers', () => {
  test('Expect handle SYNC_PROGRESS', () => {
    let mockProgress = syncModel.progress

    const { progress } = syncReducers(
      initialState,
      syncAction.syncProgress(mockProgress)
    )

    expect(progress).toEqual(mockProgress)
  })

  test('Expect handle START_SYNC', () => {
    const { isSyncing } = syncReducers(initialState, syncAction.startSync())

    expect(isSyncing).toEqual(true)
  })

  test('Expect handle END_SYNC', () => {
    const { isSyncing } = syncReducers(initialState, syncAction.endSync())

    expect(isSyncing).toEqual(false)
  })
})
