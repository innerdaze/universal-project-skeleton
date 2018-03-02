import React from 'react'
import OrdersHeaderLayout from '../../components/OrdersHeaderLayout'
import MainMenuControlContainer from '../../containers/MainMenuControlContainer'
import ModeDisplayContainer from '../../containers/ModeDisplayContainer'
import SyncButtonContainer from '../../containers/SyncButtonContainer'
import ProductSearchContainer from '../../containers/ProductSearchContainer'

let wrapper

describe('Testing on OrdersHeaderLayout...', () => {
  beforeEach(() => {
    wrapper = shallow(<OrdersHeaderLayout />)
  })

  describe('OrdersHeaderLayout layout', () => {
    test('Expect OrdersHeaderLayout to have parent Header and a Box comp', () => {
      expect(wrapper.find('Header')).toHaveLength(1)

      expect(wrapper).toMatchSnapshot()
    })

    test('Expect Header comp to have MainMenuControlContainer and ModeDisplayContainer', () => {
      expect(
        wrapper.find('Header').contains(<MainMenuControlContainer />)
      ).toEqual(true)
      expect(wrapper.find('Header').contains(<ModeDisplayContainer />)).toEqual(
        true
      )

      expect(wrapper).toMatchSnapshot()
    })

    test('Expect Box comp to have SyncButtonContainer and ProductSearchContainer', () => {
      expect(
        wrapper
          .find('Header')
          .find('Box')
          .contains(<SyncButtonContainer />)
      ).toEqual(true)
      expect(
        wrapper
          .find('Header')
          .find('Box')
          .contains(<ProductSearchContainer />)
      ).toEqual(true)

      expect(wrapper).toMatchSnapshot()
    })
  })
})
