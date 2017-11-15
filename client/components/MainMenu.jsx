import React from 'react'
import Sidebar from 'grommet/components/Sidebar'
import Header from 'grommet/components/Header'
import Box from 'grommet/components/Box'
import Title from 'grommet/components/Title'
import MainMenuHideControlContainer from '../containers/MainMenuHideControlContainer'
import ModeSwitcherContainer from '../containers/ModeSwitcherContainer'
import LogoutControlContainer from '../containers/LogoutControlContainer'
import ReinitializeControlContainer from '../containers/ReinitializeControlContainer'
import StoreIDLabelContainer from '../containers/StoreIDLabelContainer'

const MainMenu = () => (
  <Sidebar
    full
    colorIndex='brand'
    >
    <Header
      pad={{
        horizontal: 'large',
        vertical: 'medium'
      }}
      justify='between'
      >
      <Title>
        Site Assistant
      </Title>
      <MainMenuHideControlContainer/>
    </Header>
    <Box pad={{
      horizontal: 'large'
    }}>
      <StoreIDLabelContainer/>
    </Box>
    <Box
      flex='grow'
      justify='start'
      >
      <ModeSwitcherContainer/>
    </Box>
    <Box>
      <ReinitializeControlContainer/>
    </Box>
    <Box>
      <LogoutControlContainer/>
    </Box>
  </Sidebar>
)

export default MainMenu
