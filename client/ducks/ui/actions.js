
import { createActions } from 'redux-actions';
import { createIdentityActionMap } from '../../helpers/ducks'
export default createActions({
  UI: createIdentityActionMap(
    'UI_SHOW_MENU',
    'UI_HIDE_MENU'
  )
}
);
