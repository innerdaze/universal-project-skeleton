import faker from 'faker'
import { compose, map, applySpec, always } from 'ramda'

// TODO: Write MockModel Class to code gen the generate methods

// Wastage
export const appModel = {
  apiRoot: faker.internet.url,
  storeID: always(0)
}

export const generateappModel = applySpec(appModel)
export const generateappModelArray = compose(map(generateappModel), Array)
