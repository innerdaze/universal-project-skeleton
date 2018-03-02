import React from 'react'
import MainMenuHideControl from '../../components/MainMenuHideControl'

let wrapper, hideMenu

describe('Testing on MainMenuHideControl...', () => {
  beforeEach(() => {
    hideMenu = jest.fn()
    wrapper = shallow(<MainMenuHideControl hideMenu={hideMenu} />)
  })

  describe('MainMenuHideControl layout', () => {
    test('Expect MainMenuHideControl to have a parent Menu comp and child Button comp', () => {
      expect(wrapper.find('Menu')).toHaveLength(1)
      expect(wrapper.find('Menu').find('Button')).toHaveLength(1)

      expect(wrapper).toMatchSnapshot()
    })
  })

  describe('Test on prop', () => {
    test('Expect hideMenu prop function is called if Button is clicked', () => {
      wrapper.find('Button').simulate('click')

      expect(hideMenu).toBeCalled()
      expect(wrapper).toMatchSnapshot()
    })
  })
})
