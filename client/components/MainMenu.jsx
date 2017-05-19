import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Sidebar from 'grommet/components/Sidebar'
import Header from 'grommet/components/Header'
import Box from 'grommet/components/Box'
import Title from 'grommet/components/Title'
import MainMenuHideControlContainer from '../containers/MainMenuHideControlContainer'
import ModeSwitcherContainer from '../containers/ModeSwitcherContainer'
import Modes from '../constants/OperationModes'

const MainMenu = () => (
  <Sidebar colorIndex='neutral-1' full={true}>
    <Header pad='medium'
      justify='between'>
      <Title>
        Site Assistant
      </Title>
      <MainMenuHideControlContainer/>
    </Header>
    <Box flex='grow'
      justify='start'>
      <ModeSwitcherContainer/>
    </Box>
  </Sidebar>
)

export default MainMenu
