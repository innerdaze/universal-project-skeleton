import faker from 'faker'
import { compose, map, applySpec } from 'ramda'

export const orderModel = {
  id: faker.random.uuid(),
  orderIDs: faker.random.uuid(),
  error: faker.lorem.sentence(),
  mode: faker.lorem.word(),
  quantity: faker.random.number(),
  order: {},
  transaction: {}
}
