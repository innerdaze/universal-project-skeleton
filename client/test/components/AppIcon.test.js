import React from 'react'
import AppIcon from '../../components/AppIcon'

let wrapper

describe('Testing on AppIcon...', () => {
  test('Expect AppIcon to have a SVGIcon comp', () => {
    wrapper = shallow(<AppIcon />)

    expect(wrapper.find('SVGIcon')).toHaveLength(1)
    expect(wrapper).toMatchSnapshot()
  })
})
