import React from 'react'
import LogoutControl from '../../components/LogoutControl'

let wrapper, handleLogoutPress

describe('Testing on LogoutControl...', () => {
  beforeEach(() => {
    handleLogoutPress = jest.fn()
    wrapper = shallow(<LogoutControl handleLogoutPress={handleLogoutPress} />)
  })

  describe('LogoutControl layout', () => {
    test('Expect LogoutControl to have Menu parent comp and a Anchor child comp', () => {
      expect(wrapper.find('Menu')).toHaveLength(1)

      expect(wrapper).toMatchSnapshot()
    })
  })

  describe('Test on prop', () => {
    test('Expect handleLogoutPress to be called if Anchor click', () => {
      wrapper.find('Anchor').simulate('click')
      expect(handleLogoutPress).toBeCalled()
      expect(wrapper).toMatchSnapshot()
    })
  })
})
