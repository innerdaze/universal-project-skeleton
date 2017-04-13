import React, { Component } from 'react'
import BackgroundSyncProgressContainer from '../containers/BackgroundSyncProgressContainer.jsx'
import BarcodeInputFormContainer from '../containers/BarcodeInputFormContainer.jsx'
import ScannedItemListContainer from '../containers/ScannedItemListContainer.jsx'
import ModeSwitcherContainer from '../containers/ModeSwitcherContainer.jsx'
import ProcessItemsButtonContainer from '../containers/ProcessItemsButtonContainer.jsx'
import Box from 'grommet/components/Box'
import Section from 'grommet/components/Section'
import Footer from 'grommet/components/Footer'

const OrdersLayout = () => (
  <Section
    primary={true}
    appCentered={true}
    direction='column'
    full={true}>
    <BackgroundSyncProgressContainer/>
    <ModeSwitcherContainer/>
    <BarcodeInputFormContainer/>
    <ScannedItemListContainer/>
    <ProcessItemsButtonContainer/>
  </Section>
)

export default OrdersLayout
