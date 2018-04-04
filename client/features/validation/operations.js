import actions from './actions'

export const validationAction = actions.validation

const validate = ({ fieldID, value, validation, error }) => dispatch => {
  if (!validation(value)) {
    dispatch(validationAction.invalidate(fieldID, error))
    return false
  }
  dispatch(validationAction.validate(fieldID))
  return true
}

const validateP = ({ fieldID, value, validation, error }) => dispatch =>
  new Promise((resolve, reject) => {
    if (!validation(value)) {
      dispatch(validationAction.invalidate(fieldID, error))
      reject(error)
    }
    dispatch(validationAction.validate(fieldID))
    resolve(true)
  })

export default {
  validate,
  validateP
}
