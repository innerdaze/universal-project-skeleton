import React from 'react'
import BarcodeInputForm from '../../components/BarcodeInputForm'

let wrapper, onSubmitBarcode, shouldFocusField

jest.useFakeTimers()

describe('Testing on BarcodeInputForm...', () => {
  beforeEach(() => {
    onSubmitBarcode = jest.fn()
    shouldFocusField = false

    wrapper = shallow(
      <BarcodeInputForm
        onSubmitBarcode={onSubmitBarcode}
        shouldFocusField={shouldFocusField}
      />
    )
  })

  describe('BarcodeInputForm layout', () => {
    test('Expect BarcodeInputForm to have a Form with an input field and Button as child comps', () => {
      expect(wrapper.find('Form')).toHaveLength(1)
      expect(wrapper.find('Form').find('input')).toHaveLength(1)
      expect(wrapper.find('Form').find('Button')).toHaveLength(1)
      expect(wrapper).toMatchSnapshot()
    })
  })

  describe('Test on prop', () => {
    test('Expect onSubmitBarcode prop function is called when submit Button is clicked', () => {
      wrapper.find('Button').simulate('click', {
        preventDefault() {}
      })

      expect(onSubmitBarcode).toBeCalled()
      expect(wrapper).toMatchSnapshot()
    })
  })

  describe('Test on state', () => {
    test('Expect barcode state to change when input field is changed', () => {
      wrapper.find('input').prop('onChange', {
        preventDefault() {}
      })({
        target: {
          value: 'foo'
        }
      })

      expect(wrapper.state('barcode')).toEqual('foo')
      expect(wrapper).toMatchSnapshot()
    })
  })

  describe('Test on methods', () => {
    test('Expect componentDidMount and receiveFocus is called', () => {
      let componentDidMountSpy = jest.spyOn(
        BarcodeInputForm.prototype,
        'componentDidMount'
      )
      let receiveFocusSpy = jest.spyOn(
        BarcodeInputForm.prototype,
        'receiveFocus'
      )
      wrapper = mount(
        <BarcodeInputForm
          onSubmitBarcode={onSubmitBarcode}
          shouldFocusField={shouldFocusField}
        />
      )

      expect(componentDidMountSpy).toHaveBeenCalled()
      expect(receiveFocusSpy).toHaveBeenCalled()
      expect(setTimeout.mock.calls.length).toBeGreaterThanOrEqual(1)
      expect(wrapper).toMatchSnapshot()
    })

    test('Expect componentWillReceiveProps is called when shouldFocusField change from false to true', () => {
      let componentWillReceivePropsSpy = jest.spyOn(
        BarcodeInputForm.prototype,
        'componentWillReceiveProps'
      )
      wrapper = mount(
        <BarcodeInputForm
          onSubmitBarcode={onSubmitBarcode}
          shouldFocusField={shouldFocusField}
        />
      )

      wrapper.setProps({
        shouldFocusField: true
      })

      expect(componentWillReceivePropsSpy).toHaveBeenCalled()
      expect(wrapper).toMatchSnapshot()
    })
  })
})
