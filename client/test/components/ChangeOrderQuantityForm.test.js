import React from 'react'
import ChangeOrderQuantityForm from '../../components/ChangeOrderQuantityForm'

let wrapper, order, handleSubmit, handleCancel

describe('Testing on ChangeOrderQuantityForm...', () => {
  beforeEach(() => {
    order = {}
    handleSubmit = jest.fn()
    handleCancel = jest.fn()

    wrapper = shallow(
      <ChangeOrderQuantityForm
        order={order}
        handleSubmit={handleSubmit}
        handleCancel={handleCancel}
      />
    )
  })

  describe('ChangeOrderQuantityForm layout', () => {
    test('Expect ChangeOrderQuantityForm to have a Form with children comp, Header, input and Footer', () => {
      expect(wrapper.find('Form')).toHaveLength(1)
      expect(
        wrapper
          .find('Form')
          .find('FormField')
          .find('input')
      ).toHaveLength(1)
      expect(wrapper.find('Form').find('Footer')).toHaveLength(1)
      expect(wrapper).toMatchSnapshot()
    })

    test('Expect Header to have a Heading comp in it', () => {
      expect(wrapper.find('Header').find('Heading')).toHaveLength(1)
      expect(wrapper).toMatchSnapshot()
    })

    test('Expect to show Label if order prop is valid object', () => {
      order = {
        ProductName: 'Test Label',
        Qty: 2,
        _id: 1
      }
      handleSubmit = jest.fn()
      handleCancel = jest.fn()

      wrapper = shallow(
        <ChangeOrderQuantityForm
          order={order}
          handleSubmit={handleSubmit}
          handleCancel={handleCancel}
        />
      )

      expect(wrapper.find('Box').find('Label')).toHaveLength(1)
      expect(
        wrapper
          .find('Box')
          .find('Label')
          .html()
      ).toContain('Test Label')
      expect(wrapper).toMatchSnapshot()
    })

    test('Expect Footer to have 2 Anchor child comps in it', () => {
      expect(wrapper.find('Footer').find('Anchor')).toHaveLength(2)
      expect(wrapper).toMatchSnapshot()
    })
  })

  describe('Test on prop', () => {
    test('Expect prop function handleSubmit to be called if Form submit or Anchor Update is clicked', () => {
      wrapper.find('Anchor[label="Update"]').simulate('click', {
        preventDefault() {}
      })
      expect(handleSubmit).toBeCalled()

      wrapper.find('Form').simulate('submit', {
        preventDefault() {}
      })
      expect(handleSubmit.mock.calls).toHaveLength(2)

      expect(wrapper).toMatchSnapshot()
    })

    test('Expect prop function handleCancel to be called if Anchor Cancel is clicked', () => {
      wrapper.find('Anchor[label="Cancel"]').simulate('click', {
        preventDefault() {}
      })
      expect(handleCancel).toBeCalled()
      expect(wrapper).toMatchSnapshot()
    })
  })

  describe('Test on state', () => {
    test('Expect quantity state to equal order prop Qty value', () => {
      order = {
        ProductName: 'Test Label',
        Qty: 2,
        _id: 1
      }
      wrapper = shallow(
        <ChangeOrderQuantityForm
          order={order}
          handleSubmit={handleSubmit}
          handleCancel={handleCancel}
        />
      )
      expect(wrapper.state('quantity')).toEqual(order.Qty)
      expect(wrapper).toMatchSnapshot()
    })

    test('Expect quantity state to change if input field is changed', () => {
      wrapper.find('input').prop('onChange', {
        preventDefault() {}
      })({
        target: {
          value: 20
        }
      })

      expect(wrapper.state('quantity')).toEqual(20)
      expect(wrapper).toMatchSnapshot()
    })
  })
})
