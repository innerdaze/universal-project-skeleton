import faker from 'faker'
import { compose, map, applySpec, always } from 'ramda'

// TODO: Write MockModel Class to code gen the generate methods

// Wastage
export const barcodeModel = {
  barcodeID: faker.random.number
}

export const generatebarcodeModel = applySpec(barcodeModel)
export const generatebarcodeModelArray = compose(map(barcodeModel), Array)
