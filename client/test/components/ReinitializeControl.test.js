import React from 'react'
import ReinitializeControl from '../../components/ReinitializeControl'

let wrapper, handleReinitializePress

describe('Testing on ReinitializeControl...', () => {
  beforeEach(() => {
    handleReinitializePress = jest.fn()

    wrapper = shallow(
      <ReinitializeControl handleReinitializePress={handleReinitializePress} />
    )
  })

  describe('ReinitializeControl Layout', () => {
    test('Expect to have a Anchor comp within Menu comp', () => {
      expect(wrapper.find('Menu')).toHaveLength(1)
      expect(wrapper.find('Menu').find('Anchor')).toHaveLength(1)

      expect(wrapper).toMatchSnapshot()
    })
  })

  describe('Test on prop', () => {
    test('Expect to call prop function handleReinitializePress if Anchor click', () => {
      wrapper.find('Anchor').simulate('click')

      expect(handleReinitializePress).toBeCalled()
      expect(wrapper).toMatchSnapshot()
    })
  })
})
