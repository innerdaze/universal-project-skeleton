import faker from 'faker'

export const validationModel = {
  fieldID: faker.random.uuid(),
  error: faker.lorem.sentence()
}
