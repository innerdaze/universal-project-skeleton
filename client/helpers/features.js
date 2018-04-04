/* eslint-disable import/prefer-default-export */
import { zipObj, length, compose } from 'ramda'

const createUndefinedArraySameLengthAsList = compose(Array, length)

export const createIdentityActionMap = (...list) =>
  zipObj(
    list,
    createUndefinedArraySameLengthAsList(list)
  )
