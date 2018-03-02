import React from 'react'
import ModeSwitcher from '../../components/ModeSwitcher'

let wrapper, onSwitch, activeMode

describe('Testing on ModeSwitcher...', () => {
  beforeEach(() => {
    onSwitch = jest.fn()
    activeMode = 0
    wrapper = shallow(
      <ModeSwitcher onSwitch={onSwitch} activeMode={activeMode} />
    )
  })

  describe('ModeSwitcher layout', () => {
    test('Expect ModeSwitcher to have parent Menu comp and 4 Anchor child comp', () => {
      expect(wrapper.find('Menu')).toHaveLength(1)
      expect(wrapper.find('Menu').find('Anchor')).toHaveLength(4)

      expect(wrapper).toMatchSnapshot()
    })
  })

  describe('Test on prop', () => {
    test('Expect onSwitch prop function to called if one of the Anchor is clicked', () => {
      wrapper.find('Anchor[label="Stocktake"]').simulate('click')
      expect(onSwitch).toBeCalled()
      expect(wrapper).toMatchSnapshot()

      wrapper.find('Anchor[label="Order"]').simulate('click')
      expect(onSwitch).toBeCalled()
      expect(wrapper).toMatchSnapshot()

      wrapper.find('Anchor[label="Delivery"]').simulate('click')
      expect(onSwitch).toBeCalled()
      expect(wrapper).toMatchSnapshot()

      wrapper.find('Anchor[label="Shelf Labels"]').simulate('click')
      expect(onSwitch).toBeCalled()
      expect(wrapper).toMatchSnapshot()
    })
  })

  describe('Test on prop', () => {
    describe('Expect mode state to change and activeMode prop change', () => {
      wrapper = mount(
        <ModeSwitcher onSwitch={onSwitch} activeMode={activeMode} />
      )
      wrapper.setState({
        activeMode: 1
      })
      wrapper.setProps({
        activeMode: 2
      })

      expect(wrapper.state('mode')).toEqual(2)
      expect(wrapper).toMatchSnapshot()
    })
  })

  describe('Test on state', () => {
    describe('Expect mode state to equal actionMode props when first initialized', () => {
      activeMode = 1
      wrapper = mount(
        <ModeSwitcher onSwitch={onSwitch} activeMode={activeMode} />
      )

      expect(wrapper.state('mode')).toEqual(1)
      expect(wrapper).toMatchSnapshot()
    })
  })
})
