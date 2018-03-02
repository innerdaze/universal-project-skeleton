import React from 'react'
import NavigationBar from '../../components/NavigationBar'

let wrapper

describe('Testing on NavigationBar...', () => {
  describe('NavigationBar Layout', () => {
    wrapper = shallow(<NavigationBar />)

    test('Expect NavigationBar to have a parent Footer comp and child Menu comp', () => {
      expect(wrapper.find('Footer')).toHaveLength(1)
      expect(wrapper.find('Footer').find('Menu')).toHaveLength(1)

      expect(wrapper).toMatchSnapshot()
    })
  })
})
