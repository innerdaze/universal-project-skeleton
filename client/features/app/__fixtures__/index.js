import faker from 'faker'
import { compose, map, applySpec, always } from 'ramda'

// TODO: Write MockModel Class to code gen the generate methods

export const appModel = {}

export const generateAppModel = applySpec(appModel)
export const generateAppModelArray = compose(
  map(generateAppModel),
  Array
)
