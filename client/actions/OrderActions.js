import * as types from '../constants/ActionTypes'

export function addOrder(order) {
  return {type: types.ADD_ORDER, order}
}

export function deleteOrder(id) {
  return {type: types.DELETE_ORDER, id}
}

export function changeOrderQuantity(id, quantity) {
  return {type: types.CHANGE_ORDER_QUANTITY, id, quantity}
}

export function requestOrders(device) {
  return {
    type: types.REQUEST_ORDERS,
    device
  }
}

export function receiveOrders(device, json) {
  return {
    type: types.RECEIVE_ORDERS,
    device,
    orders: json.data.children.map(child => child.data),
    receivedAt: Date.now()
  }
}
