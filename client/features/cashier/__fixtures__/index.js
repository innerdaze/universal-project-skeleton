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

export const selectorModel = {
  cashier: {
    cashiers: {
      activeCashier: {
        AccessType: 0,
        CashierID: '1',
        CashierName: 'Andrea',
        CashierPassword: '1',
        CashierRefID: '',
        ClockDate: '1899-12-30T00:00:00',
        ClockDiscFromGroup: false,
        ClockINDiscID: '',
        ClockOUTDiscID: '',
        ClockStatus: 0,
        CompanyID: 0,
        CustID: '',
        Deleted: false,
        FullName: '',
        GroupID: 1,
        HourlyRate: 0,
        InheritPSFromGroup: false,
        JobType: '',
        MaxDiscount: 0,
        MaxDiscountFlag: false,
        OvertimeRate: 0,
        PayScaleID: '',
        SafeDropLowLimit: 0,
        SafeDropUpperLimit: 0,
        SecurityLevel: 0,
        StoreID: '',
        UseDrawer: 0,
        UserID: '',
        WeeklyHours: 0
      }
    },
    cashierEntities: {
      1: {
        AccessType: 0,
        CashierID: '1',
        CashierName: 'Andrea',
        CashierPassword: '1',
        CashierRefID: '',
        ClockDate: '1899-12-30T00:00:00',
        ClockDiscFromGroup: false,
        ClockINDiscID: '',
        ClockOUTDiscID: '',
        ClockStatus: 0,
        CompanyID: 0,
        CustID: '',
        Deleted: false,
        FullName: '',
        GroupID: 1,
        HourlyRate: 0,
        InheritPSFromGroup: false,
        JobType: '',
        MaxDiscount: 0,
        MaxDiscountFlag: false,
        OvertimeRate: 0,
        PayScaleID: '',
        SafeDropLowLimit: 0,
        SafeDropUpperLimit: 0,
        SecurityLevel: 0,
        StoreID: '',
        UseDrawer: 0,
        UserID: '',
        WeeklyHours: 0
      }
    }
  }
}
