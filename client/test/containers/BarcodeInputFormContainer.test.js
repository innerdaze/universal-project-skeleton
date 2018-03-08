import React from 'react'
import BarcodeInputFormContainer from '../../containers/BarcodeInputFormContainer'
import { createMockStore } from 'redux-test-utils'

let wrapper, context, store, state

describe('Testing on BarcodeInputFormContainer...', () => {
  beforeEach(() => {
    state = {
      barcode: {
        barcodeLookup: {}
      },
      ui: {},
      order: {
        orders: {}
      },
      sync: {}
    }
    store = createMockStore(state)
    context = {
      store
    }
    wrapper = shallow(<BarcodeInputFormContainer />, { context })
  })

  describe('Test on mapStateToProps', () => {
    test('test on mapStateToProps', () => {
      const action = {
        type: 'BARCODE/LOOKUP_BARCODE',
        payload: {
          barcodeID: 'FOO'
        }
      }

      wrapper
        .dive()
        .find('input')
        .prop('onChange', {
          preventDefault() {}
        })({
        target: {
          value: 'FOO'
        }
      })
      wrapper
        .dive()
        .find('Button[label="Search"]')
        .simulate('click', {
          preventDefault() {}
        })
      expect(store.isActionTypeDispatched(action.type)).toBe(true)
    })
  })
})
