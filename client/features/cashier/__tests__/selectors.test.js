import { cashierSelectors } from '../'
import genricSelector from '../../app/__test__/genericSelectorsTest'
const testSelector = genricSelector.testSelector
import { selectorModel } from '../__fixtures__'
const mockParameters = selectorModel
describe('cashier Selectors', () => {
  testSelector({
    selector: cashierSelectors.activeCashier,
    state: mockParameters,
    key: 'activeCashier',
    xpath: 'cashier.cashiers'
  })

  testSelector({
    selector: cashierSelectors.cashierEntities,
    state: mockParameters,
    key: 'cashierEntities',
    xpath: 'cashier'
  })
})
