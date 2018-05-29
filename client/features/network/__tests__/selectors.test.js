import { networkSelectors } from '../'
import genricSelector from '../../app/__test__/genericSelectorsTest'
const testSelector = genricSelector.testSelector
const mockParametersNetwork = {
  network: {
    isOffline: false
  }
}

describe('network Selectors', () => {
  testSelector({
    selector: networkSelectors.isOffline,
    state: mockParametersNetwork,
    key: 'isOffline',
    xpath: 'network'
  })
})
