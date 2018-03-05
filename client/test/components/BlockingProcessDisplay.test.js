import React from 'react'
import BlockingProcessDisplay from '../../components/BlockingProcessDisplay'
import Splash from '../../components/Splash'

let wrapper, component

describe('Testing on BlockingProcessDisplay...', () => {
  beforeEach(() => {
    component = <Splash />
    wrapper = shallow(<BlockingProcessDisplay component={component} />)
  })

  describe('BlockingProcessDisplay layout', () => {
    test('Expect BlockingProcessDisplay to have Box as parent of component prop that passing in', () => {
      expect(wrapper.find('Box')).toHaveLength(1)
      expect(wrapper.find('Box').find('Splash')).toHaveLength(1)
      expect(wrapper).toMatchSnapshot()
    })
  })
})
