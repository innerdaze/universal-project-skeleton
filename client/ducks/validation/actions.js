
import { createActions } from 'redux-actions';
export default createActions({
  VALIDATION: {
    INVALIDATE:(fieldID, error)=>({fieldID, error}),
    VALIDATE:fieldID=>({fieldID})
  }
}
);
