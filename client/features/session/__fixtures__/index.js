import faker from 'faker'

export const sessionModel = {
  id: faker.random.uuid(),
  user: faker.internet.userName(),
  payload: {},
  lastUpdated: faker.random.number()
}
