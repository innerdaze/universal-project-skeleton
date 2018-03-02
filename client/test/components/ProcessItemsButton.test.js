import React from 'react'
import ProcessItemsButton from '../../components/ProcessItemsButton'

let wrapper, onProcessItemsClick

describe('Testing ProcessItemsButton...', () => {
  beforeEach(() => {
    onProcessItemsClick = jest.fn()
    wrapper = shallow(
      <ProcessItemsButton onProcessItemsClick={onProcessItemsClick} />
    )
  })

  describe('ProcessItemsButton layout', () => {
    test('Expect ProcessItemsButton to have a Button', () => {
      expect(wrapper.find('Button')).toHaveLength(1)

      expect(wrapper).toMatchSnapshot()
    })
  })

  describe('Test on prop', () => {
    test('Expect onProcessItemsClick is called when Button click', () => {
      wrapper.find('Button').simulate('click', {
        preventDefault() {}
      })

      expect(onProcessItemsClick).toBeCalled()
      expect(wrapper).toMatchSnapshot()
    })
  })

  describe('Test on state', () => {
    test('Expect default state of canProcess is true', () => {
      expect(wrapper.state('canProcess')).toEqual(true)
      expect(wrapper).toMatchSnapshot()
    })
  })
})
