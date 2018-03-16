import syncActions from '../actions'

describe('Testing on sync actions...', () => {
  test('Test on syncProgress', () => {
    let progress = 'foo'
    let expectedAction = {
      type: 'SYNC/SYNC_PROGRESS',
      payload: {
        progress
      }
    }

    expect(syncActions.sync.syncProgress(progress)).toEqual(expectedAction)
  })
})
