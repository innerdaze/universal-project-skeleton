import networkReducers from '../reducers'
import actions from '../actions'
const networkAction=actions.network
const initialState = {
  isNetFailOffline: false,
  isNetFailNoSession: false
}

describe('Testing networkReducers', () => {
  test('Expect handle NET_FAIL_OFFLINE', () => {
    const{isNetFailOffline}=networkReducers(initialState,networkAction.netFailOffline())
    expect(isNetFailOffline).toEqual(true)
  })

  test('Expect handle NET_FAIL_NO_SESSION', () => {
    const{isNetFailNoSession}=networkReducers(initialState,networkAction.netFailNoSession())
    expect(isNetFailNoSession).toEqual(false)
  })
})
