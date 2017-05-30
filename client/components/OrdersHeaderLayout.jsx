import React, { Component } from 'react'
import Header from 'grommet/components/Header'
import Box from 'grommet/components/Box'
import Search from 'grommet/components/Search'
import Title from 'grommet/components/Title'
import MainMenuControlContainer from '../containers/MainMenuControlContainer'
import SyncButtonContainer from '../containers/SyncButtonContainer'
import ModeDisplayContainer from '../containers/ModeDisplayContainer'
import ProductSearchContainer from '../containers/ProductSearchContainer'

const OrdersHeaderLayout = () => (
  <Header>
    <MainMenuControlContainer/>
    <ModeDisplayContainer/>
    <Box
      flex={true}
      fill={true}
      direction='row'
      justify='end'
      responsive={false}>
      <SyncButtonContainer/>
      <ProductSearchContainer/>
    </Box>
  </Header>
)

export default OrdersHeaderLayout
