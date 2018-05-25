import { errorSelectors } from '../'
import genricSelector from '../../app/__test__/genericSelectorsTest'
const testSelector = genricSelector.testSelector
const mockParametersActiveError = {
  error: {
    activeError: false
  }
}
const mockParametersOfflineFlag = {
  error: {
    offlineFlag: true
  }
}
describe('error Selectors', () => {
  testSelector({
    selector: errorSelectors.error,
    state: mockParametersActiveError,
    key: 'activeError',
    xpath: 'error'
  })

  testSelector({
    selector: errorSelectors.isOffline,
    state: mockParametersOfflineFlag,
    key: 'offlineFlag',
    xpath: 'error'
  })
})
