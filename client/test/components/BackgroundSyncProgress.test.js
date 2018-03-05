import React from 'react'
import BackgroundSyncProgress from '../../components/BackgroundSyncProgress'

let wrapper, progress

describe('Testing on BackgroundSyncProgress...', () => {
  beforeEach(() => {
    progress = 0.1
    wrapper = shallow(<BackgroundSyncProgress progress={progress} />)
  })

  describe('BackgroundSyncProgress layout', () => {
    test('Expect BackgroundSyncProgress to have Heading and Meter comp', () => {
      expect(wrapper.find('Box')).toHaveLength(1)
      expect(wrapper.find('Box').find('Heading')).toHaveLength(1)
      expect(wrapper.find('Box').find('Meter')).toHaveLength(1)

      expect(wrapper).toMatchSnapshot()
    })
  })
})
