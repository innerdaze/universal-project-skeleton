import React from 'react'
import MainMenuControl from '../../components/MainMenuControl'

let wrapper, showMenu

describe('Testing on MainMenuControl...', () => {
  beforeEach(() => {
    showMenu = jest.fn()
    wrapper = shallow(<MainMenuControl showMenu={showMenu} />)
  })

  describe('MainMenuControl layout', () => {
    test('Expect MainMenuControl to have a Button', () => {
      expect(wrapper.find('Button')).toHaveLength(1)

      expect(wrapper).toMatchSnapshot()
    })
  })

  describe('Test on prop', () => {
    test('Expect showMenu prop function to call if Button click', () => {
      wrapper.find('Button').simulate('click')

      expect(showMenu).toBeCalled()
      expect(wrapper).toMatchSnapshot()
    })
  })
})
