import syncReducers from '../../features/sync/reducers'

let initialState = {
  isSyncing: false,
  progress: 0
}

describe('Testing on sync reducers', () => {
  test('Expect handle SYNC_PROGRESS', () => {
    let progress = 0.2
    let action = {
      type: 'SYNC/SYNC_PROGRESS',
      payload: {
        progress
      }
    }
    let expectedState = {
      ...initialState,
      progress: progress
    }

    expect(syncReducers(initialState, action)).toEqual(expectedState)
  })

  test('Expect handle START_SYNC', () => {
    let action = {
      type: 'SYNC/START_SYNC'
    }

    let expectedState = {
      ...initialState,
      isSyncing: true
    }

    expect(syncReducers(initialState, action)).toEqual(expectedState)
  })

  test('Expect handle END_SYNC', () => {
    let action = {
      type: 'SYNC/END_SYNC'
    }

    let expectedState = {
      ...initialState,
      isSyncing: false
    }

    expect(syncReducers(initialState, action)).toEqual(expectedState)
  })
})
