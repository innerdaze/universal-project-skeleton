import React from 'react'
import { map, apply, zip, times } from 'ramda'
import { v4 } from 'uuid'
import Box from 'grommet/components/Box'

const propArray = [
  'Supplier Code',
  'PackSize',
  'In Stock',
  'On Order',
  'Avg Weekly Sales'
]

const renderItemDetailPair = (key, prop, value) => (
  <Box key={key} margin={{ right: 'medium' }} flex='grow'>
    <span style={{ color: '#6b6b6b', fontWeight: 600 }}>{prop}</span> {value}
  </Box>
)

const applyDataToRender = apply(renderItemDetailPair)

const keyAndPropsArray = zip(times(v4, propArray.length), propArray)

const zipFlatWithNested = (values, props) => {
  values.forEach((item, index) => props[index].push(item))

  return props
}

const OrderMeta = ({
  order: { product: { SupplierID, PackSize, CurrStock, OnOrder, AvgSales } }
}) =>
  map(
    applyDataToRender,
    zipFlatWithNested(
      [SupplierID, PackSize, CurrStock, OnOrder, AvgSales],
      keyAndPropsArray
    )
  )

export default OrderMeta
