import React from 'react'
import Initialize from '../../components/Initialize'

let wrapper, onApiRootFormSubmit

describe('Testing on Initialize...', () => {
  beforeEach(() => {
    onApiRootFormSubmit = jest.fn()

    wrapper = shallow(<Initialize onApiRootFormSubmit={onApiRootFormSubmit} />)
  })

  describe('Initialize layout', () => {
    test('Expect Initialize to have Form as parent comp and Header, some Paragraph, 2 TextInput and a Footer with a Buuton in it', () => {
      expect(wrapper.find('Box').find('Form')).toHaveLength(1)
      expect(wrapper.find('Form').find('Header')).toHaveLength(1)
      expect(
        wrapper
          .find('Form')
          .find('Header')
          .find('Heading')
      ).toHaveLength(1)
      expect(wrapper.find('Form').find('Paragraph')).toHaveLength(3)
      expect(
        wrapper
          .find('Form')
          .find('FormField')
          .find('TextInput')
      ).toHaveLength(2)
      expect(wrapper.find('Form').find('Footer')).toHaveLength(1)
      expect(
        wrapper
          .find('Form')
          .find('Footer')
          .find('Button')
      ).toHaveLength(1)
      expect(wrapper).toMatchSnapshot()
    })
  })

  describe('Test on prop', () => {
    test('Expect onApiRootFormSubmit is called when Form is submitted or Button Continue is clicked ', () => {
      wrapper.find('Form').simulate('submit', {
        preventDefault() {}
      })

      expect(onApiRootFormSubmit).toBeCalled()
      expect(wrapper).toMatchSnapshot()
    })
  })

  describe('Test on state', () => {
    test('Expect storeID state to change if TextInput storeID is change', () => {
      wrapper.find('TextInput[name="storeID"]').prop('onDOMChange', {
        preventDefault() {}
      })({
        target: {
          value: 'foo'
        }
      })

      expect(wrapper.state('storeID')).toEqual('foo')
      expect(wrapper).toMatchSnapshot()
    })

    test('Expect storeID state to change if TextInput apiRoot is change', () => {
      wrapper.find('TextInput[name="apiRoot"]').prop('onDOMChange', {
        preventDefault() {}
      })({
        target: {
          value: 'bar'
        }
      })

      expect(wrapper.state('apiRoot')).toEqual('bar')
      expect(wrapper).toMatchSnapshot()
    })
  })
})
