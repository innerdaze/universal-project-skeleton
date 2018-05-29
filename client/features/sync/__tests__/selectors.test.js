import { syncSelectors } from '../'
import genricSelector from '../../app/__test__/genericSelectorsTest'
const testSelector = genricSelector.testSelector
const mockParametersIsSync = {
  sync: {
    isSyncing: true
  }
}
const mockParametersProgres = {
  sync: {
    progress: true
  }
}
describe('sync Selectors', () => {
  testSelector({
    selector: syncSelectors.isSyncing,
    state: mockParametersIsSync,
    key: 'isSyncing',
    xpath: 'sync'
  })
  testSelector({
    selector: syncSelectors.progress,
    state: mockParametersProgres,
    key: 'progress',
    xpath: 'sync'
  })
})
