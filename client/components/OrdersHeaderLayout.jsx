import React from 'react'
import Box from 'grommet/components/Box'
import Search from 'grommet/components/Search'
import Header from 'grommet/components/Header'
import MainMenuControlContainer from '../containers/MainMenuControlContainer'
import SyncButtonContainer from '../containers/SyncButtonContainer'
import ModeDisplayContainer from '../containers/ModeDisplayContainer'
import ProductSearchContainer from '../containers/ProductSearchContainer'

const OrdersHeaderLayout = () => (
  <Header>
    <MainMenuControlContainer/>
    <ModeDisplayContainer/>
    <Box
      flex
      fill
      direction='row'
      justify='end'
      responsive={false}
      >
      <SyncButtonContainer/>
      <ProductSearchContainer/>
    </Box>
  </Header>
)

export default OrdersHeaderLayout
