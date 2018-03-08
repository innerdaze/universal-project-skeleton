import networkReducers from '../../features/network/reducers'

const initialState = {
  isNetFailOffline: false,
  isNetFailNoSession: false
}

describe('Testing networkReducers', () => {
  test('Expect handle NET_FAIL_OFFLINE', () => {
    let action = {
      type: 'NETWORK/NET_FAIL_OFFLINE'
    }

    expect(networkReducers({}, action)).toHaveProperty('isNetFailOffline', true)
  })

  test('Expect handle NET_FAIL_NO_SESSION', () => {
    let action = {
      type: 'NETWORK/NET_FAIL_NO_SESSION'
    }

    expect(networkReducers({}, action)).toHaveProperty(
      'isNetFailNoSession',
      false
    )
  })
})
