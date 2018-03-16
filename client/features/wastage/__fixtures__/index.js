import faker from 'faker'
import { compose, map, applySpec, always } from 'ramda'

// TODO: Write MockModel Class to code gen the generate methods

// Wastage
export const wastageModel = {
  _id: faker.random.uuid,
  StoreID: faker.random.alphaNumeric,
  ProductID: faker.random.alphaNumeric,
  TypeID: faker.random.alphaNumeric,
  DimID: always(0),
  Qty: faker.random.number
}

export const generateWastage = applySpec(wastageModel)
export const generateWastageArray = compose(map(generateWastage), Array)

// WastageType
export const wastageTypeModel = {
  __type: always('WastageType'),
  Name: faker.random.word,
  TypeID: faker.random.alphaNumeric
}

export const generateWastageType = applySpec(wastageTypeModel)
export const generateWastageTypeArray = compose(map(generateWastageType), Array)
