import {
  START_SYNC,
  END_SYNC
} from '../constants/ActionTypes'

export function startSync() {
  return {
    type: START_SYNC
  }
}

export function endSync() {
  return {
    type: END_SYNC
  }
}
