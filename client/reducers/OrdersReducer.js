export function orders(state = {
  isFetching: false,
  didInvalidate: false,
  items: []
}, action) {
  switch (action.type) {
    case 'ADD_ORDER':
      return {
        ...state,
        items: [
          ...state.items,
          ...action.id
        ]
      }
    case 'DELETE_ORDER':
      return {
        ...state,
        items: state.items.filter(value => {
          return value !== action.id
        })
      }
    case 'INVALIDATE_ORDERS':
      return {
        ...state,
        didInvalidate: true
      }
    case 'REQUEST_ORDERS':
      return {
        ...state,
        isFetching: true,
        didInvalidate: false
      }
    case 'RECEIVE_ORDERS':
      return {
        ...state,
        isFetching: false,
        didInvalidate: false,
        items: action.orders,
        lastUpdated: action.receivedAt
      }
    default:
      return state
  }
}

export function orderEntities(state = {}, action) {
  switch (action.type) {
    case 'ADD_ORDER':
      return {
        ...state,
        [action.id]: action.order
      }
    case 'DELETE_ORDER':
      return state.map((item, index) => {
        if (index !== action.id) {
          return item
        }
        return null
      })
    case 'CHANGE_ORDER_QUANTITY':
      return state.map((item, index) => {
        if (index === action.id) {
          return Object.assign({}, ...item, {
            quantity: action.quantity
          })
        }
        return item
      })
    default:
      return state
  }
}
