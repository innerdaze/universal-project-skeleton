
import { createActions } from 'redux-actions';
import {
  INVALIDATE, VALIDATE
} from '../../constants/ActionTypes'
export default createActions({
  UI: {
    INVALIDATE:(fieldID, error)=>(fieldID, error),
    VALIDATE:fieldID=>fieldID
  }
}
);
