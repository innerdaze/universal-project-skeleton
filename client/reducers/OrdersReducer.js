function orders(state = {orders: []}, action) {
  switch (action.type) {
    case 'ADD_ORDER':
      return {
        ...state,
        orders: [
          ...state.orders,
          ...action.order
        ]
      }
    case 'DELETE_ORDER':
      return {
        ...state,
        orders: state.orders.map((order, index) => {
          if (index !== action.id) {
            return order
          }
          return null
        })
      }
    case 'CHANGE_ORDER_QUANTITY':
      return {
        ...state,
        orders: state.orders.map((order, index) => {
          if (index === action.id) {
            return Object.assign({}, ...order, {
              quantity: action.quantity
            })
          }
          return order
        })
      }
    default:
      return state
  }
}

export default orders
