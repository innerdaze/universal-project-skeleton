import { createActions } from 'redux-actions'
import { createIdentityActionMap } from '~/helpers/features'
export default createActions({
  UI: createIdentityActionMap('UI_SHOW_MENU', 'UI_HIDE_MENU')
})
