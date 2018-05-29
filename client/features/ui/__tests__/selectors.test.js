import { uiSelectors } from '../'
import genricSelector from '../../app/__test__/genericSelectorsTest'
const testSelector = genricSelector.testSelector
const mockParametersUi = {
  ui: {
    mainMenuVisible: true
  }
}
describe('ui Selectors', () => {
  testSelector({
    selector: uiSelectors.mainMenuVisible,
    state: mockParametersUi,
    key: 'mainMenuVisible',
    xpath: 'ui'
  })
})
