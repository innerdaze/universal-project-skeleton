import React from 'React'
import Scanner from '../../components/Scanner'
let wrapper, onSubmitBarcode, scan

describe('Testing Scanner...', () => {
  beforeEach(() => {
    onSubmitBarcode = jest.fn()
    scan = jest.fn()
    wrapper = shallow(<Scanner onSubmitBarcode={onSubmitBarcode} scan={scan} />)
  })

  describe('Scanner layout', () => {
    test('Check there is a Form with a TextInput and a Button', () => {
      expect(wrapper.find('Form')).toHaveLength(1)
      expect(wrapper.find('TextInput')).toHaveLength(1)
      expect(wrapper.find('Button')).toHaveLength(1)

      expect(wrapper).toMatchSnapshot()
    })
  })

  describe('Testing on prop', () => {
    test('Expect onSubmitBarcode is called when Button is click', () => {
      wrapper.find('Button').simulate('click', {
        preventDefault() {}
      })
      expect(onSubmitBarcode).toHaveBeenCalled()
      expect(wrapper).toMatchSnapshot()
    })
  })

  describe('Testing on state', () => {
    test('Expect barcode to change when TextInput change', () => {
      wrapper.find('TextInput').prop('onDOMChange')({
        target: {
          value: 'test'
        }
      })
      expect(wrapper.state().barcode).toEqual('test')
      expect(wrapper).toMatchSnapshot()
    })
  })
})
