import { createSelector } from 'reselect'

 const activeCashier = state => state.cashiers.activeCashier
 const isRaiding = state => state.app.apiRoot

export default {
  activeCashier
  }