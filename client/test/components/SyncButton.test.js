import React from 'react'
import SyncButton from '../../components/SyncButton'

let wrapper, sync

describe('Testing SyncButton', () => {
  beforeEach(() => {
    sync = jest.fn()

    wrapper = shallow(<SyncButton sync={sync} />)
  })

  describe('SyncButton layout', () => {
    test('Expect to have a Button', () => {
      expect(wrapper.find('Button')).toHaveLength(1)

      expect(wrapper).toMatchSnapshot()
    })
  })

  describe('Test on prop', () => {
    test('Expect sync prop function to called if Button click', () => {
      wrapper.find('Button').simulate('click')
      expect(sync).toBeCalled()

      expect(wrapper).toMatchSnapshot()
    })
  })
})
