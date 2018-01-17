import { createSelector } from 'reselect';

const isLoggedIn= state=> state.session.alive;
const isInitialized= state=> state.app.isInitialized;
const apiRootValidationError= state=> state.validation.apiRoot;
export default {
    isLoggedIn,
    isInitialized,
    apiRootValidationError
}
