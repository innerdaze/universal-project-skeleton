import React from 'react'
import { map, apply, zip, times, without } from 'ramda'
import { v4 } from 'uuid'
import Box from 'grommet/components/Box'
import Modes from '../constants/OperationModes'

const renderItemDetailPair = (key, prop, value) => (
  <Box key={key} margin={{ right: 'medium' }} flex='grow'>
    <span style={{ color: '#6b6b6b', fontWeight: 600 }}>{prop}</span> {value}
  </Box>
)

const applyDataToRender = apply(renderItemDetailPair)

const keyAndPropsArray = propArray =>
  zip(times(v4, propArray.length), propArray)

const zipFlatWithNested = (values, props) => {
  values.forEach((item, index) => props[index].push(item))

  return props
}

const OrderMeta = ({
  order: {
    product: {
      SupplierID,
      PackSize,
      CurrStock,
      OnOrder,
      AvgSales,
      SellingPrice
    }
  },
  mode
}) => {
  let nestedAry = [SupplierID, PackSize, CurrStock, OnOrder, AvgSales]
  let propArray = [
    'Supplier Code',
    'PackSize',
    'In Stock',
    'On Order',
    'Avg Weekly Sales'
  ]

  switch (mode) {
    case Modes.STOCKTAKE:
      propArray = without(['In Stock'], propArray)
      nestedAry = [SupplierID, PackSize, OnOrder, AvgSales]
      break
    case Modes.SHELF_LABELS:
      propArray = propArray.concat('Selling Price')
      nestedAry = nestedAry.concat(SellingPrice)
      break
  }

  return map(
    applyDataToRender,
    zipFlatWithNested(nestedAry, keyAndPropsArray(propArray))
  )
}

export default OrderMeta
