import React from 'react'
import PromptStartModifyingTransaction from '../../components/PromptStartModifyingTransaction'

let wrapper, onSubmit, onCancel

describe('Testing on PromptStartModifyingTransaction...', () => {
  beforeEach(() => {
    onSubmit = jest.fn()
    onCancel = jest.fn()
    wrapper = shallow(
      <PromptStartModifyingTransaction
        onSubmit={onSubmit}
        onCancel={onCancel}
      />
    )
  })

  describe('PromptStartModifyingTransaction layout', () => {
    test('Expect to have Title, Heading, Paragraph and Footer', () => {
      expect(wrapper.find('Title')).toHaveLength(1)
      expect(wrapper.find('Heading')).toHaveLength(1)
      expect(wrapper.find('Paragraph')).toHaveLength(1)
      expect(wrapper.find('Footer')).toHaveLength(1)

      expect(wrapper).toMatchSnapshot()
    })

    test('Expect Footer to have 2 Anchor comps', () => {
      expect(wrapper.find('Anchor')).toHaveLength(2)

      expect(wrapper).toMatchSnapshot()
    })
  })

  describe('Test on prop', () => {
    test('Expect onSubmit method to call if Anchor Continue is clicked', () => {
      wrapper.find('Anchor[label="Continue"]').simulate('click')

      expect(onSubmit).toBeCalled()
    })

    test('Expect onCancel method to call if Anchor Cancel is clicked', () => {
      wrapper.find('Anchor[label="Cancel"]').simulate('click')

      expect(onCancel).toBeCalled()
    })
  })
})
