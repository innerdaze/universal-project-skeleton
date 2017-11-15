import React from 'react'
import BlueKit from 'react-bluekit'
import Route from 'react-router-dom'
import componentsIndex from '../componentsIndex'

export default () => (
  <BlueKit
    componentsIndex={componentsIndex}
    inline
  />
)
