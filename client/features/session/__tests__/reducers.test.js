import {
  sessionReducer as sessionReducers,
  user as userReducers
} from '../reducers'
import { sessionAction } from '../operations'
import { sessionModel } from '../__fixtures__'

let initialState = {
  id: '',
  alive: false,
  isRequesting: false,
  lastUpdated: null,
  error: null
}

describe('Testing on session reducers', () => {
  describe('Test on session reducers', () => {
    test('Expect handle START_SESSION', () => {
      let mockId = sessionModel.id

      const { id, alive } = sessionReducers(
        initialState,
        sessionAction.startSession(mockId)
      )

      expect(id).toEqual(mockId)
      expect(alive).toEqual(true)
    })

    test('Expect handle SUCCEED_LOGIN', () => {
      const { error } = sessionReducers(
        initialState,
        sessionAction.startSession()
      )

      expect(error).toBeNull()
    })

    test('Expect handle FAIL_LOGIN', () => {
      let mockPayload = sessionModel.payload

      const { error } = sessionReducers(
        initialState,
        sessionAction.failLogin(mockPayload)
      )

      expect(error).toHaveProperty('error')
      expect(error.error).toEqual(mockPayload)
    })

    test('Expect handle REQUEST_LOGIN', () => {
      const { isRequesting } = sessionReducers(
        initialState,
        sessionAction.requestLogin()
      )

      expect(isRequesting).toEqual(true)
    })

    test('Expect handle RECEIVE_LOGIN', () => {
      const { isRequesting, lastUpdated } = sessionReducers(
        initialState,
        sessionAction.receiveLogin()
      )

      expect(isRequesting).toEqual(false)
      expect(lastUpdated).toEqual(expect.any(Number))
    })

    test('Expect handle REQUEST_LOGOUT', () => {
      const { isRequesting } = sessionReducers(
        initialState,
        sessionAction.requestLogout()
      )

      expect(isRequesting).toEqual(true)
    })

    test('Expect handle RECEIVE_LOGOUT', () => {
      const { isRequesting, lastUpdated } = sessionReducers(
        initialState,
        sessionAction.receiveLogout()
      )

      expect(isRequesting).toEqual(false)
      expect(lastUpdated).toEqual(expect.any(Number))
    })

    test('Expect handle END_SESSION', () => {
      const { id, alive } = sessionReducers(
        initialState,
        sessionAction.endSession()
      )

      expect(id).toBeNull()
      expect(alive).toEqual(false)
    })
  })

  describe('Test on user reducers', () => {
    test('Expect handle SUCCEED_LOGIN', () => {
      let mockUser = {
        UserID: sessionModel.id,
        UserName: sessionModel.user
      }

      const { id, name } = userReducers(
        initialState,
        sessionAction.succeedLogin(mockUser)
      )

      expect(id).toEqual(mockUser.UserID)
      expect(name).toEqual(mockUser.UserName)
    })

    test('Expect handle RECEIVE_LOGOUT', () => {
      const { id, name } = userReducers(
        initialState,
        sessionAction.receiveLogout()
      )

      expect(id).toBeNull()
      expect(name).toBeNull()
    })
  })
})
