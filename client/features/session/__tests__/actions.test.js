import sessionActions from '../actions'

describe('Testing on session actions...', () => {
  test('Test on startSession', () => {
    let id = 'foo'
    let expectedAction = {
      type: 'SESSION/START_SESSION',
      payload: {
        id
      }
    }

    expect(sessionActions.session.startSession(id)).toEqual(expectedAction)
  })

  test('Test on succeedLogin', () => {
    let user = 'barUser'
    let expectedAction = {
      type: 'SESSION/SUCCEED_LOGIN',
      payload: {
        user
      }
    }

    expect(sessionActions.session.succeedLogin(user)).toEqual(expectedAction)
  })

  test('Test on failLogin', () => {
    let error = 'Error message'
    let expectedAction = {
      type: 'SESSION/FAIL_LOGIN',
      payload: {
        error
      }
    }

    expect(sessionActions.session.failLogin(error)).toEqual(expectedAction)
  })
})
