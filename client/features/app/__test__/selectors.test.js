import { appSelectors } from '../'
import genericSelectorTest from './genericSelectorTest'

const { testSelector } = genericSelectorTest

describe('app Selectors', () => {
  const mockParametersReady = {
    app: {
      isReady: true
    }
  }

  testSelector({
    selector: appSelectors.isReady,
    state: mockParametersReady,
    key: 'isReady',
    xpath: 'app'
  })
})
