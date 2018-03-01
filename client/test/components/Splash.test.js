import React from 'react'
import Splash from '../../components/Splash'

describe('Testing Splash...', () => {
  test('render Splash', () => {
    const wrapper = shallow(<Splash loadingTest='Loading...' />)

    expect(wrapper).toMatchSnapshot()
  })
})
