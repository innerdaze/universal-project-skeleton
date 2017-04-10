import React, { Component } from 'react'
import BarcodeInputFormContainer from '../containers/BarcodeInputFormContainer.jsx'
import ScannedItemListContainer from '../containers/ScannedItemListContainer.jsx'
import Box from 'grommet/components/Box'

const OrdersLayout = () => (
  <Box direction="column">
    <BarcodeInputFormContainer/>
    <ScannedItemListContainer/>
  </Box>
)

export default OrdersLayout
