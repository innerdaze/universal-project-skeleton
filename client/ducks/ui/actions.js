
import { createActions } from 'redux-actions';
import {
  UI_SHOW_MENU,
  UI_HIDE_MENU
} from '../../constants/ActionTypes'
export default createActions({
  UI: {
    UI_SHOW_MENU,
    UI_HIDE_MENU
  }
}
);
