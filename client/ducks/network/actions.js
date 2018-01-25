import { createActions } from 'redux-actions';
import {
  NET_FAIL_OFFLINE,
  NET_FAIL_NO_SESSION
} from '../../constants/ActionTypes'
debugger
export default createActions({
  NETWORK: {
    NET_FAIL_OFFLINE,
    NET_FAIL_NO_SESSION
  }
}
);
