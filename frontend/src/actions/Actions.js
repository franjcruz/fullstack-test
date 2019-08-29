import { createAction } from 'redux-actions';

import { CLEAN_AUTH, CREATE_ITEM, CREATE_USER, LIST_ITEM, LOGIN_ACTION } from '../constants';
import { apiGet, apiPost } from './../api';
import { urlCreateItem, urlListItem, urlLogin, urlUserRegister } from './../api/urls';

export const listItem = createAction(LIST_ITEM, apiGet(urlListItem));
export const createItem = createAction(CREATE_ITEM, obj => apiPost(urlCreateItem, obj)());
export const loginUser = createAction(LOGIN_ACTION, user => apiPost(urlLogin, user)());
export const registerNewUser = createAction(CREATE_USER, client => apiPost(urlUserRegister, client)());
export const logout = createAction(CLEAN_AUTH, () => {});
