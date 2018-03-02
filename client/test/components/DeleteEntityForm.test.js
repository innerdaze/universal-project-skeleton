import React from 'react'
import DeleteEntityForm from '../../components/DeleteEntityForm'

let wrapper, message, onConfirm, onCancel

describe('Testing on DeleteEntityForm...', () => {
  beforeEach(() => {
    message = 'Confirm you would like to delete this item'
    onConfirm = jest.fn()
    onCancel = jest.fn()
    wrapper = shallow(
      <DeleteEntityForm
        message={message}
        onConfirm={onConfirm}
        onCancel={onCancel}
      />
    )
  })

  describe('DeleteEntityForm layout', () => {
    test('Expect DeleteEntityForm to have parent Layer comp and child comps Paragraph and Footer', () => {
      expect(wrapper.find('Layer')).toHaveLength(1)
      expect(wrapper.find('Layer').find('Paragraph')).toHaveLength(1)
      expect(wrapper.find('Layer').find('Footer')).toHaveLength(1)

      expect(wrapper).toMatchSnapshot()
    })

    test('Expect Footer comp to have 2 Anchor comps', () => {
      expect(wrapper.find('Footer').find('Anchor')).toHaveLength(2)

      expect(wrapper).toMatchSnapshot()
    })
  })

  describe('Test on prop', () => {
    test('Expect onConfirm to call when Anchor Confirm is clicked', () => {
      wrapper.find('Anchor[label="Confirm"]').simulate('click')

      expect(onConfirm).toBeCalled()
      expect(wrapper).toMatchSnapshot()
    })

    test('Expect onCancel to call when Anchor Cancel is clicked', () => {
      wrapper.find('Anchor[label="Cancel"]').simulate('click')

      expect(onCancel).toBeCalled()
      expect(wrapper).toMatchSnapshot()
    })
  })
})
