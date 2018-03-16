import React from 'react'
import Box from 'grommet/components/Box'
import Label from 'grommet/components/Label'
import UpIcon from 'grommet/components/icons/base/Up'
import DownIcon from 'grommet/components/icons/base/Down'
import Button from 'grommet/components/Button'
import OrderMeta from './OrderMeta'
import Toggle from './Toggle'

const OrderMetaToggle = ({ order }) => (
  <Toggle
    renderA={toggle => (
      <Button plain onClick={toggle}>
        <Box
          responsive={false}
          align='center'
          direction='row'
          pad={{ between: 'small' }}
        >
          <DownIcon size='xsmall' />
          <Label size='small'>More</Label>
        </Box>
      </Button>
    )}
    renderB={toggle => (
      <Box>
        <Box direction='row' justify='between' responsive={false} wrap>
          <OrderMeta order={order} />
        </Box>
        <Button plain onClick={toggle}>
          <Box
            responsive={false}
            align='center'
            direction='row'
            pad={{ between: 'small' }}
          >
            <UpIcon size='xsmall' />
            <Label size='small'>Less</Label>
          </Box>
        </Button>
      </Box>
    )}
  />
)

export default OrderMetaToggle
