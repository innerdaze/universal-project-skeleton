import { createSelector } from 'reselect'

 const activeCashier = state => state.cashier.cashiers.activeCashier
 const cashierEntities=state=>state.cashier.cashierEntities
export default {
  activeCashier,
  cashierEntities
  }