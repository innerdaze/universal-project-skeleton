import React from 'react'
import AppLayout from '../../components/AppLayout'

let wrapper, children

describe('Testing on AppLayout...', () => {
  beforeEach(() => {
    children = [<div key='bar'>Foo</div>]
    wrapper = mount(<AppLayout children={children} />)
  })

  describe('AppLayout layout', () => {
    test('Expect AppLayout to have a parent App comp', () => {
      expect(wrapper.find('App')).toHaveLength(1)
      expect(wrapper).toMatchSnapshot()
    })
  })

  describe('Test on methods', () => {
    test('Expect componentWillUnmount is called when AppLayout is going to destroy', () => {
      let spy = jest.spyOn(wrapper.instance(), 'componentWillUnmount')

      wrapper.unmount()
      expect(spy).toHaveBeenCalled()
      expect(wrapper).toMatchSnapshot()
    })
  })
})
