import faker from 'faker'
import { compose, map, applySpec, always } from 'ramda'

// TODO: Write MockModel Class to code gen the generate methods

// Wastage
export const cashierModel = {
  json: always([
    {
      CashierID: 1,
      Deleted: false
    },
    {
      CashierID: 2,
      Deleted: true
    }
  ]),
  error: always('error')
}

export const generateCashierModel = applySpec(cashierModel)
export const generateCashierModelArray = compose(
  map(generateCashierModel),
  Array
)
