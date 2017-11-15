import React from 'react'
import PropTypes from 'prop-types'
import Label from 'grommet/components/Label'

const StoreIDLabel = ({ storeID }) =>
  <Label>
    StoreID: {storeID}
  </Label>

StoreIDLabel.propTypes = {
  storeID: PropTypes.string.isRequired
}

export default StoreIDLabel
