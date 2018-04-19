import React from 'react'
import Box from 'grommet/components/Box'

const StatusBar = ({
  background,
  color,
  text,
  fontSize,
  height,
  textAlign
}) => (
  <Box style={{ background, color, fontSize, height, textAlign }}>{text}</Box>
)

export default StatusBar
