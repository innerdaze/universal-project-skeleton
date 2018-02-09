import { createSelector } from 'reselect'

const activeCashier = state => state.cashier.cashiers.activeCashier
export default {
  activeCashier
}
