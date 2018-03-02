import React from 'react'
import MainMenu from '../../components/MainMenu'
import MainMenuHideControlContainer from '../../containers/MainMenuHideControlContainer'
import StoreIDLabelContainer from '../../containers/StoreIDLabelContainer'
import ModeSwitcherContainer from '../../containers/ModeSwitcherContainer'
import ReinitializeControlContainer from '../../containers/ReinitializeControlContainer'
import LogoutControlContainer from '../../containers/LogoutControlContainer'

let wrapper

describe('Testing on MainMenu...', () => {
  beforeEach(() => {
    wrapper = shallow(<MainMenu />)
  })

  describe('MainMenu layout', () => {
    test('Expect MainMenu to have parent Sidebar comp and Header, Title and 4 Box components', () => {
      expect(wrapper.find('Sidebar')).toHaveLength(1)
      expect(wrapper.find('Sidebar').find('Header')).toHaveLength(1)
      expect(wrapper.find('Sidebar').find('Box')).toHaveLength(4)

      expect(wrapper).toMatchSnapshot()
    })

    test('Expect Header to have a Title and MainMenuHideControlContainer in it', () => {
      expect(
        wrapper
          .find('Sidebar')
          .find('Header')
          .find('Title')
      ).toHaveLength(1)
      expect(wrapper).toMatchSnapshot()

      expect(
        wrapper
          .find('Sidebar')
          .find('Header')
          .contains(<MainMenuHideControlContainer />)
      ).toEqual(true)
      expect(wrapper).toMatchSnapshot()
    })

    test('Expect Box component to have StoreIDLabelContainer, ModeSwitcherContainer, ReinitializeControlContainer and LogoutControlContainer', () => {
      expect(
        wrapper
          .find('Sidebar')
          .find('Box')
          .contains(<StoreIDLabelContainer />)
      ).toEqual(true)
      expect(wrapper).toMatchSnapshot()

      expect(
        wrapper
          .find('Sidebar')
          .find('Box')
          .contains(<ModeSwitcherContainer />)
      ).toEqual(true)
      expect(wrapper).toMatchSnapshot()

      expect(
        wrapper
          .find('Sidebar')
          .find('Box')
          .contains(<ReinitializeControlContainer />)
      ).toEqual(true)
      expect(wrapper).toMatchSnapshot()

      expect(
        wrapper
          .find('Sidebar')
          .find('Box')
          .contains(<LogoutControlContainer />)
      ).toEqual(true)
      expect(wrapper).toMatchSnapshot()
    })
  })
})
