import sessionReducers from '../reducers'

let initialState = {
  id: '123',
  alive: true,
  isRequesting: false,
  lastUpdated: null,
  error: null
}

describe('Testing on session reducers', () => {
  describe('Test on session reducers', () => {
    test('Expect handle START_SESSION', () => {
      let id = 'foo'
      let action = {
        type: 'SESSION/START_SESSION',
        payload: {
          id
        }
      }

      let expectedState = {
        ...initialState,
        id: id,
        alive: true
      }

      expect(sessionReducers({}, action).session).toEqual(expectedState)
    })

    test('Expect handle SUCCEED_LOGIN', () => {
      let user = 'barUser'
      let action = {
        type: 'SESSION/SUCCEED_LOGIN',
        payload: {
          user
        }
      }

      let expectedState = {
        ...initialState,
        error: null
      }

      expect(sessionReducers({}, action).session).toEqual(expectedState)
    })

    test('Expect handle FAIL_LOGIN', () => {
      let error = 'Error message'
      let action = {
        type: 'SESSION/FAIL_LOGIN',
        payload: {
          error
        }
      }

      let expectedState = {
        ...initialState,
        error: { error }
      }

      expect(sessionReducers({}, action).session).toEqual(expectedState)
    })

    test('Expect handle REQUEST_LOGIN', () => {
      let action = {
        type: 'SESSION/REQUEST_LOGIN'
      }

      let expectedState = {
        ...initialState,
        isRequesting: true
      }

      expect(sessionReducers({}, action).session).toEqual(expectedState)
    })

    test('Expect handle RECEIVE_LOGIN', () => {
      let action = {
        type: 'SESSION/RECEIVE_LOGIN'
      }

      let expectedState = {
        ...initialState,
        isRequesting: false,
        lastUpdated: expect.any(Number)
      }

      expect(sessionReducers({}, action).session).toEqual(expectedState)
    })

    test('Expect handle REQUEST_LOGOUT', () => {
      let action = {
        type: 'SESSION/REQUEST_LOGOUT'
      }

      let expectedState = {
        ...initialState,
        isRequesting: true
      }

      expect(sessionReducers({}, action).session).toEqual(expectedState)
    })

    test('Expect handle RECEIVE_LOGOUT', () => {
      let action = {
        type: 'SESSION/RECEIVE_LOGOUT'
      }

      let expectedState = {
        ...initialState,
        isRequesting: false,
        lastUpdated: expect.any(Number)
      }

      expect(sessionReducers({}, action).session).toEqual(expectedState)
    })

    test('Expect handle END_SESSION', () => {
      let action = {
        type: 'SESSION/END_SESSION'
      }

      let expectedState = {
        ...initialState,
        id: null,
        alive: false
      }

      expect(sessionReducers({}, action).session).toEqual(expectedState)
    })
  })

  describe('Test on user reducers', () => {
    test('Expect handle SUCCEED_LOGIN', () => {
      let user = {
        UserID: 'foo',
        UserName: 'bar'
      }
      let action = {
        type: 'SESSION/SUCCEED_LOGIN',
        payload: {
          user
        }
      }

      let expectedState = {
        ...initialState,
        id: user.UserID,
        name: user.UserName
      }

      expect(sessionReducers({}, action).user).toEqual(expectedState)
    })

    test('Expect handle RECEIVE_LOGOUT', () => {
      let action = {
        type: 'SESSION/RECEIVE_LOGOUT'
      }

      let expectedState = {
        ...initialState,
        id: null,
        name: null
      }

      expect(sessionReducers({}, action).user).toEqual(expectedState)
    })
  })
})
