import {
  INVALIDATE, VALIDATE
} from '../constants/ActionTypes'

function _invalidate({ fieldID, error }) {
  return {
    type: INVALIDATE,
    fieldID,
    error
  }
}

function _validate(fieldID) {
  return {
    type: VALIDATE,
    fieldID
  }
}

export function validate({ fieldID, value, validation, error }) {
  return dispatch => {
    if (!(validation(value))) {
      dispatch(_invalidate({ fieldID, error }))
      return false
    }
    dispatch(_validate(fieldID))
    return true
  }
}
