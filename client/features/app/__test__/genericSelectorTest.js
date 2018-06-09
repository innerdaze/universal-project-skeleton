import { compose, path, split } from 'ramda'

const dotPath = compose(
  path,
  split('.')
)

const testSelector = ({ selector, state, key, xpath }) => {
  const subState = dotPath(xpath)(state)

  describe(key, () => {
    it(`should return ${subState[key]} as expected`, () =>
      expect(selector(state)).toEqual(subState[key]))
  })
}

const expectValue = (actual, expected, key) => {
  const fn = () =>
    test(`should return ${expected}`, () => expect(actual).toEqual(expected))

  return key ? describe(key, fn) : fn()
}

export default { testSelector, expectValue }
