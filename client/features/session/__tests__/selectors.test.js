import { sessionSelectors } from '../'
import genricSelector from '../../app/__test__/genericSelectorsTest'
const testSelector = genricSelector.testSelector
const mockParametersIsLogedIn = {
  session: {
    session: { alive: true }
  }
}
const mockParametersError = {
  session: {
    session: { error: true }
  }
}
const mockParametersId = {
  session: {
    id: '1'
  }
}
const mockParametersRequiresDomainSelector = {
  session: {
    session: { requiresDomain: true }
  }
}
const mockParametersError = {
  session: {
    session: { domain: '@domain.com' }
  }
}
describe('session Selectors', () => {
  testSelector({
    selector: sessionSelectors.isLoggedIn,
    state: mockParametersIsLogedIn,
    key: 'alive',
    xpath: 'session.session'
  })
  testSelector({
    selector: sessionSelectors.apiRootValidationError,
    state: mockParametersError,
    key: 'error',
    xpath: 'session.session'
  })
  testSelector({
    selector: sessionSelectors.id,
    state: mockParametersId,
    key: 'id',
    xpath: 'session'
  })
  testSelector({
    selector: sessionSelectors.requiresDomainSelector,
    state: mockParametersId,
    key: 'requiresDomain',
    xpath: 'session.session'
  })
  testSelector({
    selector: sessionSelectors.domainSelector,
    state: mockParametersId,
    key: 'domain',
    xpath: 'session.session'
  })
})
