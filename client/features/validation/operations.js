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

export default {
  validate
}
