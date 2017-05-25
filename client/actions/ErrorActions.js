import {
  ERROR_DISPLAY,
  ERROR_DISMISS
} from '../constants/ActionTypes'

export function displayError(error) {
  return {
    type: ERROR_DISPLAY,
    error
  }
}

export function dismissError() {
  return {
    type: ERROR_DISMISS
  }
}
