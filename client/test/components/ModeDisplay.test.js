import React from 'react'
import ModeDisplay from '../../components/ModeDisplay'
import modeNames from '../../constants/OperationModeNames'

let wrapper, mode

describe('Testing on ModeDisplay...', () => {
  beforeEach(() => {
    mode = parseInt(Object.keys(modeNames)[0])
    wrapper = shallow(<ModeDisplay mode={mode} />)
  })
  describe('ModeDisplay layout', () => {
    test('Expect ModeDisplay to have a Title', () => {
      expect(wrapper.find('Title')).toHaveLength(1)

      expect(wrapper).toMatchSnapshot()
    })
  })

  describe('Test on prop', () => {
    test('Expect Title to display Delivery if mode prop change to 20', () => {
      mode = 20
      wrapper = render(<ModeDisplay mode={mode} />)

      expect(wrapper.text()).toEqual('Delivery')
      expect(wrapper).toMatchSnapshot()
    })
  })

  describe('Test on state', () => {
    test('Expect state to change new mode prop is injected', () => {
      wrapper = mount(<ModeDisplay mode={mode} />)
      wrapper.setState({
        mode: 10
      })
      wrapper.setProps({
        mode: 20
      })

      expect(wrapper.state('mode')).toEqual(20)
      expect(wrapper).toMatchSnapshot()
    })
  })
})
